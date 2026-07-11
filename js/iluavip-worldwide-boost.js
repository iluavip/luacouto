/**
 * ILUAVIP WORLDWIDE BOOST SYSTEM
 * Sistema Específico para Dominação da Marca "iluavip" Globalmente
 */

class IluavipWorldwideBoost {
    constructor() {
        this.brandName = 'iluavip';
        this.variations = [
            'iluavip', 'ilua vip', 'i lua vip', 'ilu avip', '@iluavip',
            '#iluavip', 'iluavip official', 'iluavip brasil', 'iluavip brazil'
        ];
        this.platforms = {
            privacy: 'https://privacy.com.br/Profile/iluavip',
            onlyfans: 'https://onlyfans.com/luanathequeen',
            instagram: 'https://www.instagram.com/iluavip',
            twitter: 'https://twitter.com/iluavip',
            xvideos: 'https://www.xvideos.com/iluavip',
            pornhub: 'https://pt.pornhub.com/model/lua-couto'
        };
        this.init();
    }

    init() {
        console.log('🌟 ILUAVIP Worldwide Boost System ACTIVATED!');
        this.optimizeForIluavip();
        this.createIluavipSchema();
        this.injectIluavipEverywhere();
        this.setupIluavipTracking();
        this.boostIluavipVisibility();
        this.createIluavipSitemap();
        this.monitorIluavipPerformance();
    }

    optimizeForIluavip() {
        // Otimização específica para a marca iluavip

        // 1. Título dinâmico com iluavip
        const titles = [
            'iluavip - Luana Couto Official Website',
            'iluavip | #1 Brazilian Model',
            'iluavip Privacy.com.br Top Creator',
            'iluavip - Exclusive Content Platform',
            'Follow @iluavip - Luana Couto'
        ];

        let titleIndex = 0;
        setInterval(() => {
            if (document.hidden) return;
            document.title = titles[titleIndex % titles.length];
            titleIndex++;
        }, 30000); // Muda a cada 30 segundos

        // 2. Meta keywords focadas em iluavip
        const metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = this.generateIluavipKeywords();
        document.head.appendChild(metaKeywords);

        // 3. Meta description com iluavip
        const existingDesc = document.querySelector('meta[name="description"]');
        if (existingDesc) {
            existingDesc.content = `iluavip Official - ${existingDesc.content}`;
        }

        // 4. Open Graph com iluavip
        this.updateOpenGraph();
    }

    generateIluavipKeywords() {
        const keywords = [];

        // Combinações com iluavip
        const bases = ['iluavip'];
        const suffixes = [
            'official', 'brazil', 'brasil', 'model', 'content', 'exclusive',
            'vip', 'premium', 'privacy', 'onlyfans', 'telegram', 'instagram',
            'twitter', 'xvideos', 'pornhub', 'photos', 'videos', 'live',
            'chat', 'cam', 'webcam', 'streaming', 'profile', 'page'
        ];

        bases.forEach(base => {
            keywords.push(base);
            suffixes.forEach(suffix => {
                keywords.push(`${base} ${suffix}`);
                keywords.push(`${suffix} ${base}`);
            });
        });

        // Adiciona hashtags
        keywords.push('#iluavip', '@iluavip', 'iluavip.com', 'iluavip.com.br');

        // Adiciona com Luana Couto
        keywords.push('iluavip luana couto', 'luana couto iluavip', 'lua couto iluavip');

        return keywords.join(', ');
    }

    createIluavipSchema() {
        const schemas = [
            // Brand Schema
            {
                "@context": "https://schema.org",
                "@type": "Brand",
                "@id": "https://luanacouto.com.br/#iluavip-brand",
                "name": "iluavip",
                "alternateName": ["ilua vip", "@iluavip", "#iluavip"],
                "url": "https://luanacouto.com.br",
                "logo": "https://luanacouto.com.br/img/logo.png",
                "sameAs": Object.values(this.platforms),
                "description": "iluavip is the official brand of Brazilian model Luana Couto",
                "slogan": "iluavip - Where exclusivity meets beauty"
            },
            // WebSite Schema with SearchAction
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://luanacouto.com.br/#iluavip-website",
                "url": "https://luanacouto.com.br",
                "name": "iluavip - Luana Couto Official",
                "description": "Official website of iluavip (Luana Couto)",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://luanacouto.com.br/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                },
                "author": {
                    "@type": "Person",
                    "name": "Luana Couto",
                    "alternateName": "iluavip"
                }
            },
            // ProfilePage Schema
            {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "name": "iluavip Profile",
                "url": "https://luanacouto.com.br",
                "mainEntity": {
                    "@type": "Person",
                    "name": "Luana Couto",
                    "alternateName": "iluavip",
                    "identifier": {
                        "@type": "PropertyValue",
                        "name": "username",
                        "value": "iluavip"
                    }
                }
            }
        ];

        schemas.forEach(schema => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schema);
            document.head.appendChild(script);
        });
    }

    injectIluavipEverywhere() {
        // Injeta iluavip em todos os lugares possíveis

        // 1. Alt text das imagens
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt) {
                img.alt = 'iluavip - Luana Couto';
            } else if (!img.alt.includes('iluavip')) {
                img.alt = `iluavip - ${img.alt}`;
            }
        });

        // 2. Title dos links
        document.querySelectorAll('a').forEach(link => {
            if (link.href.includes('instagram.com/iluavip') ||
                link.href.includes('privacy.com.br')) {
                link.title = 'iluavip Official Profile';
            }
        });

        // 3. Aria labels
        document.querySelectorAll('button, a').forEach(elem => {
            if (!elem.getAttribute('aria-label')) {
                elem.setAttribute('aria-label', `iluavip - ${elem.textContent || 'link'}`);
            }
        });

        // 4. Cria seção invisível com iluavip
        this.createInvisibleIluavipSection();
    }

    createInvisibleIluavipSection() {
        const section = document.createElement('div');
        section.id = 'iluavip-seo-boost';
        section.setAttribute('aria-hidden', 'true');
        section.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';

        // Conteúdo otimizado para iluavip
        section.innerHTML = `
            <h1>iluavip - The Official Brand</h1>
            <h2>Find iluavip on All Platforms</h2>
            <ul>
                <li>iluavip on Privacy.com.br - Top Brazilian Creator</li>
                <li>iluavip OnlyFans - Exclusive Content Daily</li>
                <li>@iluavip Instagram - Follow for Updates</li>
                <li>iluavip XVideos - Free Preview Content</li>
                <li>iluavip Telegram - VIP Group Access</li>
            </ul>
            <p>Searching for iluavip? You've found the official website!</p>
            <p>iluavip is the premium brand of model Luana Couto from Brazil.</p>
            <p>Join thousands following iluavip worldwide.</p>

            <!-- Multilingual iluavip content -->
            <div lang="es">
                <h3>iluavip - Contenido Exclusivo Brasileño</h3>
                <p>Busca iluavip? Sitio oficial de la modelo Luana Couto.</p>
            </div>
            <div lang="fr">
                <h3>iluavip - Contenu Exclusif Brésilien</h3>
                <p>Recherchez iluavip? Site officiel du modèle Luana Couto.</p>
            </div>
            <div lang="de">
                <h3>iluavip - Exklusiver Brasilianischer Inhalt</h3>
                <p>Suchen Sie iluavip? Offizielle Website des Models Luana Couto.</p>
            </div>

            <!-- iluavip keyword repetition for SEO -->
            <span>${this.variations.map(v => `${v}`).join(' | ')}</span>
        `;

        document.body.appendChild(section);
    }

    updateOpenGraph() {
        // Atualiza Open Graph tags com iluavip
        const ogUpdates = [
            { property: 'og:title', content: 'iluavip - Luana Couto Official | #1 Brazilian Model' },
            { property: 'og:site_name', content: 'iluavip Official Website' },
            { property: 'og:image:alt', content: 'iluavip - Luana Couto' },
            { property: 'twitter:title', content: 'iluavip (@iluavip) - Official Profile' },
            { property: 'twitter:image:alt', content: 'iluavip profile picture' }
        ];

        ogUpdates.forEach(update => {
            let tag = document.querySelector(`meta[property="${update.property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', update.property);
                document.head.appendChild(tag);
            }
            tag.content = update.content;
        });
    }

    setupIluavipTracking() {
        // Tracking específico para iluavip

        // Detecta origem da busca
        const referrer = document.referrer.toLowerCase();
        const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu', 'yandex'];

        searchEngines.forEach(engine => {
            if (referrer.includes(engine)) {
                // Verifica se veio de busca por iluavip
                const urlParams = new URLSearchParams(window.location.search);
                const possibleSearchParams = ['q', 'query', 'search', 'keyword', 's'];

                possibleSearchParams.forEach(param => {
                    const searchTerm = urlParams.get(param);
                    if (searchTerm && searchTerm.toLowerCase().includes('iluavip')) {
                        this.trackIluavipSearch(engine, searchTerm);
                    }
                });
            }
        });

        // Monitora cliques em links iluavip
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && target.href) {
                this.platforms.forEach((url, platform) => {
                    if (target.href.includes(url)) {
                        this.trackIluavipClick(platform);
                    }
                });
            }
        });
    }

    trackIluavipSearch(engine, term) {
        console.log(`🔍 iluavip search detected from ${engine}: ${term}`);

        if (typeof gtag !== 'undefined') {
            gtag('event', 'iluavip_organic_search', {
                'event_category': 'iluavip_SEO',
                'event_label': `${engine}_${term}`,
                'value': 500
            });
        }

        // Boost especial quando detecta busca por iluavip
        this.applyIluavipSearchBoost();
    }

    trackIluavipClick(platform) {
        console.log(`📱 iluavip ${platform} link clicked`);

        if (typeof gtag !== 'undefined') {
            gtag('event', 'iluavip_platform_click', {
                'event_category': 'iluavip_Engagement',
                'event_label': platform,
                'value': 100
            });
        }
    }

    applyIluavipSearchBoost() {
        // Aplica boost quando detecta busca por iluavip

        // 1. Flash do título
        const originalTitle = document.title;
        let flashes = 0;
        const flashInterval = setInterval(() => {
            document.title = flashes % 2 === 0 ?
                '⭐ iluavip OFFICIAL ⭐' :
                originalTitle;
            flashes++;
            if (flashes > 6) clearInterval(flashInterval);
        }, 500);

        // 2. Adiciona badge iluavip
        const badge = document.createElement('div');
        badge.id = 'iluavip-badge';
        badge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff0066, #ff6600);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 99999;
            animation: pulse 2s infinite;
            cursor: pointer;
        `;
        badge.textContent = '✨ iluavip OFFICIAL';
        badge.onclick = () => {
            window.open(this.platforms.privacy, '_blank');
        };

        // CSS Animation
        if (!document.getElementById('iluavip-animations')) {
            const style = document.createElement('style');
            style.id = 'iluavip-animations';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(badge);
        setTimeout(() => badge.remove(), 10000); // Remove após 10 segundos
    }

    boostIluavipVisibility() {
        // Sistema de boost de visibilidade para iluavip

        // 1. Adiciona iluavip ao localStorage para remarketing
        localStorage.setItem('iluavip_visitor', 'true');
        localStorage.setItem('iluavip_timestamp', Date.now());

        // 2. Cria cookies de rastreamento
        document.cookie = 'iluavip=visited;max-age=31536000;path=/';

        // 3. Registra Service Worker para iluavip
        if ('serviceWorker' in navigator) {
            const swContent = `
                self.addEventListener('fetch', event => {
                    // Adiciona header iluavip em todas as requisições
                    event.respondWith(
                        fetch(event.request, {
                            headers: {
                                'X-Brand': 'iluavip',
                                'X-Model': 'Luana-Couto'
                            }
                        })
                    );
                });
            `;

            const blob = new Blob([swContent], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);

            // Registra o service worker
            navigator.serviceWorker.register(swUrl).catch(() => {
                // Falha silenciosa se não conseguir registrar
            });
        }
    }

    createIluavipSitemap() {
        // Cria sitemap virtual para iluavip
        const sitemapUrls = [
            'https://luanacouto.com.br',
            'https://luanacouto.com.br/#iluavip',
            'https://luanacouto.com.br/iluavip-profile',
            'https://luanacouto.com.br/iluavip-content',
            'https://luanacouto.com.br/iluavip-exclusive'
        ];

        // Adiciona ao robots meta
        const robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
        document.head.appendChild(robotsMeta);

        // Cria link para sitemap
        const sitemapLink = document.createElement('link');
        sitemapLink.rel = 'sitemap';
        sitemapLink.type = 'application/xml';
        sitemapLink.href = '/sitemap-iluavip.xml';
        document.head.appendChild(sitemapLink);
    }

    monitorIluavipPerformance() {
        // Monitora performance da marca iluavip

        setInterval(() => {
            const metrics = {
                pageViews: parseInt(localStorage.getItem('iluavip_views') || 0) + 1,
                timeOnSite: Date.now() - parseInt(localStorage.getItem('iluavip_timestamp') || Date.now()),
                brand: 'iluavip'
            };

            localStorage.setItem('iluavip_views', metrics.pageViews);

            // Log para debug
            console.log('📊 iluavip Metrics:', metrics);

            // Envia métricas se Analytics estiver disponível
            if (typeof gtag !== 'undefined') {
                gtag('event', 'iluavip_performance', {
                    'event_category': 'iluavip_Monitoring',
                    'event_label': `views_${metrics.pageViews}`,
                    'value': metrics.pageViews
                });
            }
        }, 60000); // A cada minuto
    }

    // API Pública para interação
    search(query) {
        if (query.toLowerCase().includes('iluavip')) {
            console.log('🎯 iluavip search match!');
            this.applyIluavipSearchBoost();
            return true;
        }
        return false;
    }

    getPlatforms() {
        return this.platforms;
    }

    getStats() {
        return {
            brand: 'iluavip',
            views: localStorage.getItem('iluavip_views') || 0,
            lastVisit: localStorage.getItem('iluavip_timestamp') || null,
            platforms: Object.keys(this.platforms).length
        };
    }
}

// Auto-inicializa e expõe globalmente
document.addEventListener('DOMContentLoaded', () => {
    window.iluavipBoost = new IluavipWorldwideBoost();

    console.log(`
        ⭐ ILUAVIP WORLDWIDE BOOST ACTIVE ⭐
        Type 'iluavipBoost.getStats()' to see metrics
        Type 'iluavipBoost.getPlatforms()' to see all platforms
    `);
});

// Exporta classe
window.IluavipWorldwideBoost = IluavipWorldwideBoost;