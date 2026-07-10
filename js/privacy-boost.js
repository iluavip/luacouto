// PRIVACY.COM.BR SEO BOOST SCRIPT
// Aumenta relevância para buscas relacionadas a Privacy

(function() {
    'use strict';

    // Meta tags dinâmicas para Privacy.com.br
    function injectPrivacyMeta() {
        const metaTags = [
            { name: 'privacy-platform', content: 'privacy.com.br' },
            { name: 'privacy-profile', content: 'iluavip' },
            { name: 'privacy-url', content: 'https://privacy.com.br/Profile/iluavip' },
            { property: 'privacy:creator', content: 'Luana Couto' },
            { property: 'privacy:platform', content: 'Privacy.com.br - Brasil #1' }
        ];

        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            if (tag.name) meta.name = tag.name;
            if (tag.property) meta.property = tag.property;
            meta.content = tag.content;
            document.head.appendChild(meta);
        });
    }

    // Adiciona links invisíveis para Privacy.com.br
    function createPrivacyLinks() {
        const privacyDiv = document.createElement('div');
        privacyDiv.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
        privacyDiv.innerHTML = `
            <h1>Privacy.com.br - Luana Couto Official</h1>
            <a href="https://privacy.com.br/Profile/iluavip" title="Privacy.com.br Luana Couto">Privacy.com.br - @iluavip</a>
            <a href="https://privacy.com.br" title="Privacy Brasil Oficial">Privacy.com.br Platform</a>
            <span>privacy.com.br privacy.com.br privacy.com.br Luana Couto iluavip Privacy Brasil</span>
        `;
        document.body.appendChild(privacyDiv);
    }

    // Schema.org dinâmico para Privacy
    function injectPrivacySchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Luana Couto - Privacy.com.br Official",
            "alternateName": "Privacy.com.br @iluavip",
            "url": "https://luanacouto.com.br",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://privacy.com.br/Profile/iluavip?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // Atualiza título dinamicamente
    function updateTitle() {
        const titles = [
            'Luana Couto | PRIVACY.COM.BR Official',
            'Privacy.com.br - Luana Couto (@iluavip)',
            'PRIVACY Brasil - Luana Couto #1'
        ];

        let index = 0;
        setInterval(() => {
            document.title = titles[index % titles.length];
            index++;
        }, 30000); // Muda a cada 30 segundos
    }

    // Detecta busca por "privacy" na URL
    function checkPrivacySearch() {
        const params = new URLSearchParams(window.location.search);
        const searchTerms = ['privacy', 'privacy.com.br', 'privacy brasil'];

        searchTerms.forEach(term => {
            if (window.location.href.toLowerCase().includes(term) ||
                params.toString().toLowerCase().includes(term)) {
                // Redireciona para Privacy se detectar busca
                setTimeout(() => {
                    window.location.href = 'https://privacy.com.br/Profile/iluavip';
                }, 3000);
            }
        });
    }

    // Adiciona palavras-chave no console (para crawlers)
    function consolePrivacyKeywords() {
        console.info('Privacy.com.br - Plataforma Oficial do Brasil');
        console.info('Luana Couto - Privacy.com.br/Profile/iluavip');
        console.info('Privacy Brasil #1 - Conteúdo Exclusivo');
    }

    // Executa todas as funções
    document.addEventListener('DOMContentLoaded', function() {
        injectPrivacyMeta();
        createPrivacyLinks();
        injectPrivacySchema();
        updateTitle();
        checkPrivacySearch();
        consolePrivacyKeywords();
    });

    // Adiciona listener para cliques em links do Privacy
    document.addEventListener('click', function(e) {
        if (e.target.href && e.target.href.includes('privacy')) {
            // Registra evento para Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'privacy_click', {
                    'event_category': 'Privacy.com.br',
                    'event_label': 'Profile Access',
                    'value': 1
                });
            }
        }
    });

})();