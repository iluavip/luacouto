/**
 * SERVIDOR BACKEND PARA BUSCAR DADOS REAIS DO INSTAGRAM
 *
 * Como usar:
 * 1. Instale Node.js
 * 2. Execute: npm init -y
 * 3. Instale dependências: npm install express cors puppeteer axios cheerio
 * 4. Execute: node server-instagram-api.js
 * 5. Acesse: http://localhost:3001/api/instagram/iluavip
 */

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

// Cache para evitar muitas requisições
let cache = {};
const CACHE_DURATION = 60000; // 1 minuto

// MÉTODO 1: Usando Puppeteer (mais confiável mas mais pesado)
app.get('/api/instagram/puppeteer/:username', async (req, res) => {
    const username = req.params.username;

    // Verifica cache
    if (cache[username] && Date.now() - cache[username].timestamp < CACHE_DURATION) {
        return res.json(cache[username].data);
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        await page.goto(`https://www.instagram.com/${username}/`, {
            waitUntil: 'networkidle2'
        });

        // Espera a meta description carregar
        await page.waitForSelector('meta[property="og:description"]', { timeout: 5000 });

        // Extrai dados da meta tag
        const description = await page.$eval('meta[property="og:description"]', el => el.content);

        // Parse dos números (ex: "86K Followers, 428 Following, 97 Posts")
        const followersMatch = description.match(/([0-9,.]+[KMB]?)\s*Followers/i);
        const followingMatch = description.match(/([0-9,.]+[KMB]?)\s*Following/i);
        const postsMatch = description.match(/([0-9,.]+[KMB]?)\s*Posts/i);

        await browser.close();

        const data = {
            username: username,
            followers: parseCount(followersMatch ? followersMatch[1] : '0'),
            following: parseCount(followingMatch ? followingMatch[1] : '0'),
            posts: parseCount(postsMatch ? postsMatch[1] : '0'),
            timestamp: new Date().toISOString()
        };

        // Salva no cache
        cache[username] = {
            data: data,
            timestamp: Date.now()
        };

        res.json(data);

    } catch (error) {
        console.error('Erro Puppeteer:', error);
        res.status(500).json({
            error: 'Falha ao buscar dados',
            method: 'puppeteer'
        });
    }
});

// MÉTODO 2: Usando Axios + Cheerio (mais leve)
app.get('/api/instagram/:username', async (req, res) => {
    const username = req.params.username;

    // Verifica cache
    if (cache[username] && Date.now() - cache[username].timestamp < CACHE_DURATION) {
        return res.json(cache[username].data);
    }

    try {
        const response = await axios.get(`https://www.instagram.com/${username}/`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const $ = cheerio.load(response.data);

        // Tenta extrair do script JSON-LD
        let data = { username: username };

        $('script[type="application/ld+json"]').each((i, elem) => {
            try {
                const json = JSON.parse($(elem).html());
                if (json['@type'] === 'ProfilePage') {
                    // Extrai informações se disponíveis
                    const interaction = json.mainEntity?.interactionStatistic;
                    if (interaction) {
                        interaction.forEach(stat => {
                            if (stat.interactionType === 'https://schema.org/FollowAction') {
                                data.followers = stat.userInteractionCount;
                            }
                        });
                    }
                }
            } catch (e) {}
        });

        // Fallback: extrai da meta description
        const description = $('meta[property="og:description"]').attr('content');
        if (description) {
            const followersMatch = description.match(/([0-9,.]+[KMB]?)\s*Followers/i);
            const followingMatch = description.match(/([0-9,.]+[KMB]?)\s*Following/i);
            const postsMatch = description.match(/([0-9,.]+[KMB]?)\s*Posts/i);

            data.followers = data.followers || parseCount(followersMatch ? followersMatch[1] : '0');
            data.following = parseCount(followingMatch ? followingMatch[1] : '0');
            data.posts = parseCount(postsMatch ? postsMatch[1] : '0');
        }

        // Tenta extrair do window._sharedData
        const scriptMatch = response.data.match(/window\._sharedData\s*=\s*({.+?});/);
        if (scriptMatch) {
            try {
                const sharedData = JSON.parse(scriptMatch[1]);
                const user = sharedData.entry_data?.ProfilePage?.[0]?.graphql?.user;
                if (user) {
                    data.followers = user.edge_followed_by?.count || data.followers;
                    data.following = user.edge_follow?.count || data.following;
                    data.posts = user.edge_owner_to_timeline_media?.count || data.posts;
                    data.biography = user.biography;
                    data.profilePicUrl = user.profile_pic_url_hd;
                }
            } catch (e) {}
        }

        data.timestamp = new Date().toISOString();

        // Salva no cache
        cache[username] = {
            data: data,
            timestamp: Date.now()
        };

        res.json(data);

    } catch (error) {
        console.error('Erro Axios:', error.message);

        // Retorna dados em cache antigos se existirem
        if (cache[username]) {
            return res.json({
                ...cache[username].data,
                cached: true,
                error: 'Usando dados em cache'
            });
        }

        res.status(500).json({
            error: 'Instagram pode estar bloqueando requisições',
            suggestion: 'Tente o endpoint /api/instagram/puppeteer/' + username
        });
    }
});

// MÉTODO 3: Proxy para API não oficial
app.get('/api/instagram/unofficial/:username', async (req, res) => {
    const username = req.params.username;

    try {
        // APIs não oficiais que às vezes funcionam
        const endpoints = [
            `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
            `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
            `https://www.instagram.com/${username}/?__a=1&__d=dis`
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        'User-Agent': 'Instagram 76.0.0.15.395 Android',
                        'Accept': '*/*',
                        'Cookie': '' // Adicione cookies se tiver
                    },
                    timeout: 5000
                });

                if (response.data) {
                    const user = response.data.data?.user || response.data.graphql?.user;

                    if (user) {
                        const data = {
                            username: username,
                            followers: user.edge_followed_by?.count || 0,
                            following: user.edge_follow?.count || 0,
                            posts: user.edge_owner_to_timeline_media?.count || 0,
                            timestamp: new Date().toISOString()
                        };

                        // Cache
                        cache[username] = {
                            data: data,
                            timestamp: Date.now()
                        };

                        return res.json(data);
                    }
                }
            } catch (e) {
                continue;
            }
        }

        throw new Error('Todas as APIs falharam');

    } catch (error) {
        res.status(500).json({
            error: 'APIs não oficiais falharam',
            message: 'Instagram está bloqueando acesso'
        });
    }
});

// Endpoint para atualização manual
app.post('/api/instagram/manual/:username', express.json(), (req, res) => {
    const username = req.params.username;
    const data = {
        username: username,
        followers: req.body.followers || 0,
        following: req.body.following || 0,
        posts: req.body.posts || 0,
        timestamp: new Date().toISOString(),
        manual: true
    };

    cache[username] = {
        data: data,
        timestamp: Date.now()
    };

    res.json({ success: true, data: data });
});

// Função auxiliar para converter "86K" para 86000
function parseCount(str) {
    if (!str) return 0;
    str = str.toString().toUpperCase().replace(/,/g, '');

    if (str.includes('K')) {
        return Math.round(parseFloat(str.replace('K', '')) * 1000);
    } else if (str.includes('M')) {
        return Math.round(parseFloat(str.replace('M', '')) * 1000000);
    } else if (str.includes('B')) {
        return Math.round(parseFloat(str.replace('B', '')) * 1000000000);
    }

    return parseInt(str) || 0;
}

// Inicia servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`
    ✅ Servidor Instagram API rodando na porta ${PORT}

    Endpoints disponíveis:
    - GET http://localhost:${PORT}/api/instagram/iluavip
    - GET http://localhost:${PORT}/api/instagram/puppeteer/iluavip
    - GET http://localhost:${PORT}/api/instagram/unofficial/iluavip
    - POST http://localhost:${PORT}/api/instagram/manual/iluavip

    Para usar no seu site:
    fetch('http://localhost:${PORT}/api/instagram/iluavip')
        .then(res => res.json())
        .then(data => console.log(data));
    `);
});

// Testa com iluavip ao iniciar
setTimeout(async () => {
    try {
        const testResponse = await axios.get(`http://localhost:${PORT}/api/instagram/iluavip`);
        console.log('📊 Teste com @iluavip:', testResponse.data);
    } catch (error) {
        console.log('⚠️ Teste inicial falhou, servidor pode precisar de configuração');
    }
}, 2000);