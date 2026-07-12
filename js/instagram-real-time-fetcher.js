/**
 * INSTAGRAM REAL-TIME FETCHER
 * Sistema para buscar dados reais do Instagram
 *
 * IMPORTANTE: Instagram tem várias restrições de API
 * Este código mostra diferentes abordagens possíveis
 */

class InstagramRealTimeFetcher {
    constructor() {
        this.username = 'iluavip';
        this.data = {
            followers: 0,
            following: 0,
            posts: 0,
            avgLikes: 0,
            lastUpdate: null
        };
        this.init();
    }

    async init() {
        console.log('🔄 Tentando buscar dados reais do Instagram...');

        // Tenta diferentes métodos
        await this.method1_PublicAPI();
        await this.method2_ProxyServer();
        await this.method3_WebScraping();
        await this.method4_ThirdPartyAPI();
    }

    // MÉTODO 1: API Pública (NÃO OFICIAL - pode parar a qualquer momento)
    async method1_PublicAPI() {
        try {
            // Estas APIs não oficiais podem parar de funcionar
            const endpoints = [
                `https://www.instagram.com/api/v1/users/web_profile_info/?username=${this.username}`,
                `https://i.instagram.com/api/v1/users/web_profile_info/?username=${this.username}`,
                `https://www.instagram.com/${this.username}/?__a=1&__d=dis`
            ];

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        // Diferentes estruturas de resposta
                        if (data.data && data.data.user) {
                            this.parseInstagramData(data.data.user);
                        } else if (data.graphql && data.graphql.user) {
                            this.parseInstagramData(data.graphql.user);
                        }

                        console.log('✅ Dados obtidos via API pública:', this.data);
                        return true;
                    }
                } catch (err) {
                    console.warn(`❌ Endpoint falhou: ${endpoint}`);
                }
            }
        } catch (error) {
            console.error('❌ Método 1 falhou:', error);
        }
        return false;
    }

    // MÉTODO 2: Servidor Proxy (RECOMENDADO - mais confiável)
    async method2_ProxyServer() {
        try {
            // Você precisa criar um servidor backend (Node.js, Python, etc)
            // que faça o scraping e retorne os dados via API

            // Exemplo de servidor Node.js com Express:
            /*
            // server.js
            const express = require('express');
            const puppeteer = require('puppeteer');
            const cors = require('cors');

            const app = express();
            app.use(cors());

            app.get('/api/instagram/:username', async (req, res) => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(`https://www.instagram.com/${req.params.username}/`);

                // Espera carregar e extrai dados
                await page.waitForSelector('meta[property="og:description"]');
                const description = await page.$eval('meta[property="og:description"]',
                    el => el.content);

                // Parse dos dados (ex: "86K Followers, 428 Following, 97 Posts")
                const match = description.match(/([0-9,.]+[KMB]?)\s*Followers/i);
                const followers = match ? match[1] : '0';

                await browser.close();

                res.json({
                    followers: parseFollowerCount(followers),
                    username: req.params.username
                });
            });

            app.listen(3001);
            */

            // Chamada para seu servidor proxy
            const response = await fetch(`http://localhost:3001/api/instagram/${this.username}`);

            if (response.ok) {
                const data = await response.json();
                this.data = { ...this.data, ...data };
                console.log('✅ Dados obtidos via proxy server:', this.data);
                return true;
            }
        } catch (error) {
            console.warn('⚠️ Método 2 requer servidor backend rodando');
        }
        return false;
    }

    // MÉTODO 3: Web Scraping direto (BLOQUEADO por CORS no browser)
    async method3_WebScraping() {
        try {
            // Este método NÃO funciona diretamente no browser devido ao CORS
            // Mas mostra a lógica que você usaria no servidor

            console.warn('⚠️ Web scraping direto bloqueado por CORS no browser');

            // No servidor, você faria algo assim:
            /*
            const response = await fetch(`https://www.instagram.com/${this.username}/`);
            const html = await response.text();

            // Regex para extrair dados do HTML
            const followersMatch = html.match(/"edge_followed_by":{"count":(\d+)/);
            const followingMatch = html.match(/"edge_follow":{"count":(\d+)/);
            const postsMatch = html.match(/"edge_owner_to_timeline_media":{"count":(\d+)/);

            if (followersMatch) this.data.followers = parseInt(followersMatch[1]);
            if (followingMatch) this.data.following = parseInt(followingMatch[1]);
            if (postsMatch) this.data.posts = parseInt(postsMatch[1]);
            */

        } catch (error) {
            console.error('❌ Método 3 bloqueado por CORS');
        }
        return false;
    }

    // MÉTODO 4: APIs de Terceiros (PAGAS mas confiáveis)
    async method4_ThirdPartyAPI() {
        try {
            // Serviços pagos que fornecem dados do Instagram:
            const services = {
                rapidapi: {
                    url: `https://instagram-data1.p.rapidapi.com/user/info?username=${this.username}`,
                    headers: {
                        'X-RapidAPI-Key': 'SUA_API_KEY_AQUI',
                        'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com'
                    }
                },
                socialBlade: {
                    // Social Blade API (paga)
                    url: `https://api.socialblade.com/v2/instagram/user/${this.username}`,
                    headers: {
                        'Authorization': 'Bearer SUA_API_KEY_AQUI'
                    }
                },
                crowdTangle: {
                    // Facebook's CrowdTangle (requer aprovação)
                    url: `https://api.crowdtangle.com/posts?token=SUA_API_KEY`,
                }
            };

            console.warn('⚠️ APIs de terceiros requerem chaves pagas');

            // Exemplo com RapidAPI:
            /*
            const response = await fetch(services.rapidapi.url, {
                headers: services.rapidapi.headers
            });

            if (response.ok) {
                const data = await response.json();
                this.data.followers = data.follower_count;
                this.data.following = data.following_count;
                this.data.posts = data.media_count;
                return true;
            }
            */

        } catch (error) {
            console.error('❌ Método 4 requer API key paga');
        }
        return false;
    }

    // SOLUÇÃO ALTERNATIVA: Widget Embed do Instagram
    createInstagramEmbed() {
        // Instagram permite embed de posts específicos
        // Não mostra contador de seguidores, mas mostra posts reais

        const embedHTML = `
        <blockquote class="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/${this.username}/"
            data-instgrm-version="14">
        </blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
        `;

        return embedHTML;
    }

    // SOLUÇÃO HÍBRIDA: Atualização Manual Periódica
    async updateViaAdminPanel() {
        // Cria um painel admin onde você atualiza manualmente
        // os valores reais periodicamente

        try {
            // Busca de um arquivo JSON que você atualiza manualmente
            const response = await fetch('/data/instagram-stats.json');
            if (response.ok) {
                const data = await response.json();
                this.data = data;
                console.log('✅ Dados carregados do arquivo local:', this.data);
                return true;
            }
        } catch (error) {
            console.error('❌ Erro ao carregar arquivo local');
        }
        return false;
    }

    // Parser para diferentes formatos de resposta
    parseInstagramData(userData) {
        this.data.followers = userData.edge_followed_by?.count || userData.follower_count || 0;
        this.data.following = userData.edge_follow?.count || userData.following_count || 0;
        this.data.posts = userData.edge_owner_to_timeline_media?.count || userData.media_count || 0;
        this.data.lastUpdate = new Date().toISOString();
    }

    // Converte strings como "86K" para números
    parseFollowerCount(str) {
        if (!str) return 0;
        str = str.toString().toUpperCase();

        if (str.includes('K')) {
            return parseFloat(str.replace('K', '')) * 1000;
        } else if (str.includes('M')) {
            return parseFloat(str.replace('M', '')) * 1000000;
        }

        return parseInt(str.replace(/[^0-9]/g, ''));
    }
}

// IMPLEMENTAÇÃO RECOMENDADA: Fallback Strategy
class InstagramDataManager {
    constructor() {
        this.username = 'iluavip';
        this.initializeData();
    }

    async initializeData() {
        // 1. Tenta buscar dados reais
        const realTimeFetcher = new InstagramRealTimeFetcher();

        // 2. Se falhar, usa dados em cache
        if (!realTimeFetcher.data.followers) {
            this.loadCachedData();
        }

        // 3. Atualiza UI
        this.updateUI(realTimeFetcher.data);
    }

    loadCachedData() {
        // Usa os valores conhecidos como fallback
        return {
            followers: 86000,
            following: 428,
            posts: 97,
            avgLikes: 12500,
            lastUpdate: new Date().toISOString()
        };
    }

    updateUI(data) {
        // Atualiza os elementos HTML
        if (document.getElementById('ig-followers')) {
            document.getElementById('ig-followers').textContent =
                data.followers > 1000 ? (data.followers/1000).toFixed(0) + 'K' : data.followers;
        }

        if (document.getElementById('ig-following')) {
            document.getElementById('ig-following').textContent = data.following;
        }

        if (document.getElementById('ig-posts')) {
            document.getElementById('ig-posts').textContent = data.posts;
        }
    }
}

// Exporta para uso
window.InstagramRealTimeFetcher = InstagramRealTimeFetcher;
window.InstagramDataManager = InstagramDataManager;

// Log de informações sobre as limitações
console.warn(`
⚠️ LIMITAÇÕES DO INSTAGRAM:
1. Instagram não tem API pública oficial para estes dados
2. APIs não oficiais podem parar de funcionar
3. CORS bloqueia requisições diretas do browser
4. Instagram detecta e bloqueia scraping excessivo

✅ SOLUÇÕES RECOMENDADAS:
1. Criar servidor backend (Node.js/Python) para fazer scraping
2. Usar serviço pago (RapidAPI, Social Blade)
3. Atualizar manualmente via painel admin
4. Usar Instagram Basic Display API (limitada)

📝 Para implementação real, você precisa:
- Servidor backend OU
- API key de serviço pago OU
- Sistema de atualização manual
`);