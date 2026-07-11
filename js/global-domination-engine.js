/**
 * GLOBAL DOMINATION ENGINE - Luana Couto Mundial
 * Sistema de Dominação Total dos Buscadores Mundiais
 */

class GlobalDominationEngine {
    constructor() {
        this.keywords = {
            primary: ['iluavip', 'luana couto', 'lua couto', 'luacouto', 'iluacouto'],
            international: {
                en: ['brazilian model', 'brazil beauty', 'latina model', 'exotic beauty'],
                es: ['modelo brasileña', 'belleza brasileña', 'chica brasil'],
                fr: ['modèle brésilien', 'beauté brésilienne'],
                de: ['brasilianisches model', 'brasilien schönheit'],
                it: ['modella brasiliana', 'bellezza brasiliana'],
                ja: ['ブラジルモデル', 'ブラジル美女'],
                zh: ['巴西模特', '巴西美女'],
                ru: ['бразильская модель', 'бразильская красота'],
                ar: ['عارضة برازيلية', 'جمال برازيلي']
            },
            platforms: ['privacy.com.br', 'onlyfans', 'telegram', 'xvideos', 'pornhub'],
            combinations: []
        };
        this.init();
    }

    init() {
        this.generateCombinations();
        this.injectGlobalMeta();
        this.setupInternationalSchema();
        this.activateWorldwideTracking();
        this.boostInternationalSEO();
        this.setupAutoTranslation();
        console.log('🌍 Global Domination Engine ACTIVATED for iluavip!');
    }

    generateCombinations() {
        // Gera todas as combinações possíveis de keywords
        const base = ['iluavip', 'luana couto'];
        const variations = ['photos', 'videos', 'content', 'exclusive', 'vip', 'premium', 'hot', 'sexy'];

        base.forEach(b => {
            variations.forEach(v => {
                this.keywords.combinations.push(`${b} ${v}`);
                this.keywords.combinations.push(`${v} ${b}`);
            });
        });

        // Adiciona variações com erros de digitação comuns
        this.keywords.combinations.push(
            'ilua vip', 'i lua vip', 'ilu avip', 'luanna couto',
            'luana coutto', 'luana coutinho', 'lua coutto'
        );
    }

    injectGlobalMeta() {
        // Meta tags para TODOS os países
        const languages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'ru', 'ar', 'hi', 'ko'];

        languages.forEach(lang => {
            // Hreflang tags
            const hreflang = document.createElement('link');
            hreflang.rel = 'alternate';
            hreflang.hreflang = lang;
            hreflang.href = `https://luanacouto.com.br/?lang=${lang}`;
            document.head.appendChild(hreflang);

            // Meta descriptions multi-idioma
            const metaDesc = document.createElement('meta');
            metaDesc.name = `description:${lang}`;
            metaDesc.content = this.getTranslatedDescription(lang);
            document.head.appendChild(metaDesc);
        });

        // Geo-targeting meta tags
        const geoMeta = [
            { name: 'geo.region', content: 'BR' },
            { name: 'geo.placename', content: 'Brazil' },
            { name: 'geo.position', content: '-23.5505;-46.6333' },
            { name: 'ICBM', content: '-23.5505, -46.6333' },
            { property: 'business:contact_data:country_name', content: 'Brazil' }
        ];

        geoMeta.forEach(meta => {
            const tag = document.createElement('meta');
            if (meta.property) {
                tag.setAttribute('property', meta.property);
            } else {
                tag.name = meta.name;
            }
            tag.content = meta.content;
            document.head.appendChild(tag);
        });
    }

    setupInternationalSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://luanacouto.com.br/#iluavip",
            "name": "Luana Couto",
            "alternateName": ["iluavip", "Lua Couto", "iluacouto"],
            "url": "https://luanacouto.com.br",
            "sameAs": [
                "https://privacy.com.br/Profile/iluavip",
                "https://onlyfans.com/luanathequeen",
                "https://www.instagram.com/iluavip",
                "https://www.xvideos.com/iluavip",
                "https://pt.pornhub.com/model/lua-couto"
            ],
            "nationality": {
                "@type": "Country",
                "name": "Brazil"
            },
            "knowsLanguage": ["pt-BR", "en", "es"],
            "brand": {
                "@type": "Brand",
                "name": "iluavip",
                "logo": "https://luanacouto.com.br/img/logo.png"
            },
            "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Adults 18+",
                "geographicArea": {
                    "@type": "AdministrativeArea",
                    "name": "Worldwide"
                }
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    activateWorldwideTracking() {
        // Sistema de tracking global
        if (typeof gtag !== 'undefined') {
            // Eventos customizados para cada país
            const userCountry = this.detectCountry();
            gtag('event', 'page_view_international', {
                'event_category': 'International',
                'event_label': userCountry,
                'value': 1
            });

            // Track busca por iluavip
            if (document.referrer.includes('google') ||
                document.referrer.includes('bing') ||
                document.referrer.includes('yahoo')) {
                const searchTerm = this.extractSearchTerm();
                if (searchTerm && searchTerm.toLowerCase().includes('iluavip')) {
                    gtag('event', 'iluavip_search', {
                        'event_category': 'SEO',
                        'event_label': searchTerm,
                        'value': 100
                    });
                }
            }
        }
    }

    boostInternationalSEO() {
        // Cria conteúdo invisível otimizado para SEO mundial
        const seoBooster = document.createElement('div');
        seoBooster.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';

        // Conteúdo em múltiplos idiomas
        const content = `
            <h1>iluavip - Luana Couto International</h1>
            <p>iluavip official website - The #1 Brazilian model worldwide</p>
            <p>Searching for iluavip? You found the official site of Luana Couto</p>
            <p>iluavip on Privacy.com.br - Top Creator Brazil</p>
            <p>Follow @iluavip on Instagram, Twitter, OnlyFans, XVideos</p>
            <h2>¿Buscas a iluavip? Sitio oficial de Luana Couto</h2>
            <h2>Vous cherchez iluavip? Site officiel de Luana Couto</h2>
            <h2>iluavip を探していますか？ルアナ・コウトの公式サイト</h2>
            <h2>Ищете iluavip? Официальный сайт Луаны Коуту</h2>
            ${this.generateKeywordCloud()}
        `;

        seoBooster.innerHTML = content;
        document.body.appendChild(seoBooster);
    }

    generateKeywordCloud() {
        // Gera nuvem de keywords para SEO
        const cloud = [];
        this.keywords.combinations.forEach(kw => {
            cloud.push(`<span>${kw}</span>`);
        });

        // Adiciona variações específicas de iluavip
        const iluavipVariations = [
            'iluavip privacy', 'iluavip onlyfans', 'iluavip telegram',
            'iluavip xvideos', 'iluavip pornhub', 'iluavip instagram',
            'iluavip twitter', 'iluavip content', 'iluavip exclusive',
            'iluavip vip', 'iluavip premium', 'iluavip brazil'
        ];

        iluavipVariations.forEach(v => {
            cloud.push(`<strong>${v}</strong>`);
        });

        return cloud.join(' | ');
    }

    setupAutoTranslation() {
        // Sistema de auto-tradução dinâmica
        const userLang = navigator.language || navigator.userLanguage;

        if (!userLang.startsWith('pt')) {
            // Injeta Google Translate widget para usuários internacionais
            const translateScript = document.createElement('script');
            translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

            window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                    pageLanguage: 'pt',
                    includedLanguages: 'en,es,fr,de,it,ja,zh-CN,ru,ar,hi,ko',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
            };

            document.body.appendChild(translateScript);
        }
    }

    getTranslatedDescription(lang) {
        const descriptions = {
            en: 'iluavip - Official website of Luana Couto, #1 Brazilian model on Privacy.com.br, OnlyFans and exclusive platforms',
            es: 'iluavip - Sitio oficial de Luana Couto, modelo brasileña #1 en Privacy.com.br, OnlyFans y plataformas exclusivas',
            fr: 'iluavip - Site officiel de Luana Couto, modèle brésilienne #1 sur Privacy.com.br, OnlyFans et plateformes exclusives',
            de: 'iluavip - Offizielle Website von Luana Couto, #1 brasilianisches Model auf Privacy.com.br, OnlyFans und exklusiven Plattformen',
            it: 'iluavip - Sito ufficiale di Luana Couto, modella brasiliana #1 su Privacy.com.br, OnlyFans e piattaforme esclusive',
            ja: 'iluavip - ルアナ・コウトの公式サイト、Privacy.com.br、OnlyFans、独占プラットフォームでブラジル#1モデル',
            zh: 'iluavip - Luana Couto官方网站，巴西#1模特在Privacy.com.br、OnlyFans和独家平台',
            ru: 'iluavip - Официальный сайт Луаны Коуту, бразильская модель #1 на Privacy.com.br, OnlyFans и эксклюзивных платформах',
            ar: 'iluavip - الموقع الرسمي للوانا كوتو، عارضة الأزياء البرازيلية رقم 1 على Privacy.com.br و OnlyFans'
        };

        return descriptions[lang] || descriptions.en;
    }

    detectCountry() {
        // Detecta país do usuário
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const country = timezone.split('/')[0];
        return country;
    }

    extractSearchTerm() {
        // Extrai termo de busca da URL de referência
        const ref = document.referrer;
        const searchParams = new URLSearchParams(ref.split('?')[1]);
        return searchParams.get('q') || searchParams.get('query') || searchParams.get('search');
    }

    // Método para verificar se iluavip está sendo buscado
    checkIluavipSearch() {
        const searchTerms = [
            window.location.search,
            document.referrer,
            window.location.hash
        ].join(' ').toLowerCase();

        if (searchTerms.includes('iluavip') || searchTerms.includes('ilua vip')) {
            // Boost especial para buscas por iluavip
            this.activateIluavipBoost();
        }
    }

    activateIluavipBoost() {
        console.log('🚀 iluavip BOOST ACTIVATED!');

        // Altera título dinamicamente
        document.title = 'iluavip - Luana Couto Official | #1 Privacy.com.br';

        // Injeta mais keywords iluavip
        const boostMeta = document.createElement('meta');
        boostMeta.name = 'keywords';
        boostMeta.content = 'iluavip, iluavip official, iluavip privacy, iluavip onlyfans, iluavip content, iluavip exclusive, iluavip vip, iluavip premium';
        document.head.appendChild(boostMeta);

        // Notifica Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'iluavip_boost', {
                'event_category': 'SEO_Boost',
                'event_label': 'iluavip_search_detected',
                'value': 1000
            });
        }
    }
}

// Auto-inicializa
document.addEventListener('DOMContentLoaded', () => {
    window.globalDomination = new GlobalDominationEngine();

    // Verifica a cada 5 segundos se está sendo buscado por iluavip
    setInterval(() => {
        window.globalDomination.checkIluavipSearch();
    }, 5000);
});

// Exporta para uso global
window.GlobalDominationEngine = GlobalDominationEngine;