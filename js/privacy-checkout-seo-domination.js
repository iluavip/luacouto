/**
 * PRIVACY CHECKOUT SEO DOMINATION SYSTEM
 * Sistema Avançado de Linkagem Interna para Ranquear "Privacy"
 * Direciona TODO o link juice para https://privacy.com.br/checkout/iluavip
 */

class PrivacyCheckoutDomination {
    constructor() {
        this.targetURL = 'https://privacy.com.br/checkout/iluavip';
        this.anchorTexts = [
            'Privacy',
            'Privacy.com.br',
            'Assinar Privacy',
            'Privacy Premium',
            'Privacy VIP',
            'Privacy Exclusivo',
            'Conteúdo Privacy',
            'Privacy Brasil',
            'Privacy Oficial',
            'Entrar no Privacy'
        ];
        this.init();
    }

    init() {
        console.log('🎯 Privacy Checkout SEO Domination ACTIVATED!');
        this.injectStrategicLinks();
        this.createLinkSculpting();
        this.addMicrodataMarkup();
        this.implementSiloStructure();
        this.createContextualLinks();
        this.addSchemaMarkup();
        this.boostInternalPageRank();
    }

    // 1. INJETA LINKS ESTRATÉGICOS EM TODO O SITE
    injectStrategicLinks() {
        // Adiciona links contextuais automaticamente
        const textNodes = this.getTextNodes(document.body);

        textNodes.forEach(node => {
            const text = node.textContent;

            // Palavras-chave para substituir com links
            const keywords = [
                { word: 'privacy', replacement: `<a href="${this.targetURL}" title="Privacy - Assinar Agora" rel="dofollow" class="privacy-seo-link"><strong>Privacy</strong></a>` },
                { word: 'conteúdo exclusivo', replacement: `<a href="${this.targetURL}" title="Conteúdo Exclusivo no Privacy">conteúdo exclusivo</a>` },
                { word: 'plataforma', replacement: `<a href="${this.targetURL}" title="Plataforma Privacy">plataforma</a>` },
                { word: 'assinatura', replacement: `<a href="${this.targetURL}" title="Assinatura Privacy">assinatura</a>` }
            ];

            let modifiedText = text;
            keywords.forEach(kw => {
                const regex = new RegExp(`\\b${kw.word}\\b`, 'gi');
                modifiedText = modifiedText.replace(regex, kw.replacement);
            });

            if (modifiedText !== text && node.parentNode) {
                const span = document.createElement('span');
                span.innerHTML = modifiedText;
                node.parentNode.replaceChild(span, node);
            }
        });
    }

    // 2. LINK SCULPTING - Direciona o PageRank
    createLinkSculpting() {
        // Remove "nofollow" de links para Privacy
        document.querySelectorAll('a[href*="privacy.com.br"]').forEach(link => {
            link.removeAttribute('rel');
            link.setAttribute('rel', 'dofollow');

            // Adiciona atributos SEO
            if (link.href.includes('checkout/iluavip')) {
                link.setAttribute('title', 'Privacy - Assinar Agora com Desconto');
                link.setAttribute('data-priority', 'high');
                link.style.fontWeight = 'bold';
            }
        });

        // Adiciona "nofollow" em links menos importantes
        document.querySelectorAll('a[href*="instagram"], a[href*="twitter"]').forEach(link => {
            if (!link.getAttribute('rel')?.includes('nofollow')) {
                link.setAttribute('rel', 'nofollow noopener');
            }
        });
    }

    // 3. ADICIONA MICRODATA MARKUP
    addMicrodataMarkup() {
        // Adiciona markup em todos os links do Privacy
        document.querySelectorAll('a[href*="privacy.com.br/checkout/iluavip"]').forEach(link => {
            link.setAttribute('itemscope', '');
            link.setAttribute('itemtype', 'https://schema.org/CheckoutPage');
            link.setAttribute('itemprop', 'url');

            // Adiciona span com preço
            if (!link.querySelector('.price-microdata')) {
                const priceSpan = document.createElement('span');
                priceSpan.className = 'price-microdata';
                priceSpan.setAttribute('itemprop', 'price');
                priceSpan.setAttribute('content', '19.99');
                priceSpan.style.display = 'none';
                priceSpan.textContent = 'R$19,99';
                link.appendChild(priceSpan);
            }
        });
    }

    // 4. IMPLEMENTA ESTRUTURA DE SILO
    implementSiloStructure() {
        // Cria breadcrumbs focados em Privacy
        const breadcrumb = document.createElement('div');
        breadcrumb.id = 'privacy-breadcrumb';
        breadcrumb.setAttribute('itemscope', '');
        breadcrumb.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');
        breadcrumb.style.cssText = 'padding: 10px 0; font-size: 12px; color: #666;';

        breadcrumb.innerHTML = `
            <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a itemprop="item" href="https://luanacouto.com.br">
                    <span itemprop="name">Home</span>
                </a>
                <meta itemprop="position" content="1" />
            </span> >
            <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a itemprop="item" href="${this.targetURL}" style="font-weight: bold; color: #ff0066;">
                    <span itemprop="name">Privacy Premium</span>
                </a>
                <meta itemprop="position" content="2" />
            </span> >
            <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a itemprop="item" href="${this.targetURL}" style="font-weight: bold; color: #ff0066;">
                    <span itemprop="name">Assinar Agora</span>
                </a>
                <meta itemprop="position" content="3" />
            </span>
        `;

        // Adiciona após o header
        const header = document.querySelector('header');
        if (header && !document.getElementById('privacy-breadcrumb')) {
            header.parentNode.insertBefore(breadcrumb, header.nextSibling);
        }
    }

    // 5. CRIA LINKS CONTEXTUAIS AUTOMÁTICOS
    createContextualLinks() {
        // Adiciona CTA boxes em seções estratégicas
        const sections = document.querySelectorAll('section');

        sections.forEach((section, index) => {
            if (index % 2 === 0 && !section.querySelector('.privacy-cta-box')) {
                const ctaBox = document.createElement('div');
                ctaBox.className = 'privacy-cta-box';
                ctaBox.style.cssText = `
                    background: linear-gradient(135deg, #ff0066 0%, #ff6600 100%);
                    color: white;
                    padding: 20px;
                    margin: 30px 0;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(255, 0, 102, 0.3);
                `;

                ctaBox.innerHTML = `
                    <h3>🔥 Acesse o Conteúdo Exclusivo no Privacy</h3>
                    <p>Mais de 1000+ fotos e vídeos exclusivos esperando por você!</p>
                    <a href="${this.targetURL}"
                       title="Privacy - Assinar Agora"
                       style="display: inline-block; background: white; color: #ff0066; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: bold; margin-top: 10px;"
                       rel="dofollow">
                        ASSINAR PRIVACY AGORA →
                    </a>
                `;

                section.appendChild(ctaBox);
            }
        });
    }

    // 6. ADICIONA SCHEMA MARKUP AVANÇADO
    addSchemaMarkup() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy - Luana Couto Premium",
            "url": "https://luanacouto.com.br",
            "mainEntity": {
                "@type": "CheckoutPage",
                "@id": this.targetURL,
                "url": this.targetURL,
                "name": "Privacy Checkout - Assinar Luana Couto",
                "description": "Assine o Privacy de Luana Couto e tenha acesso a conteúdo exclusivo",
                "provider": {
                    "@type": "Organization",
                    "name": "Privacy.com.br",
                    "url": "https://privacy.com.br"
                },
                "offers": {
                    "@type": "Offer",
                    "price": "19.99",
                    "priceCurrency": "BRL",
                    "url": this.targetURL,
                    "availability": "https://schema.org/InStock"
                }
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@id": "https://luanacouto.com.br",
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@id": this.targetURL,
                            "name": "Privacy"
                        }
                    }
                ]
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // 7. BOOST INTERNO DE PAGERANK
    boostInternalPageRank() {
        // Cria uma rede de links internos apontando para o checkout
        const linkNetwork = document.createElement('nav');
        linkNetwork.id = 'privacy-link-network';
        linkNetwork.setAttribute('aria-label', 'Privacy Links');
        linkNetwork.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';

        linkNetwork.innerHTML = `
            <div style="background: rgba(255, 0, 102, 0.95); padding: 15px; border-radius: 10px; max-width: 200px;">
                <h4 style="color: white; margin: 0 0 10px 0; font-size: 14px;">⚡ Acesso Rápido</h4>
                <a href="${this.targetURL}"
                   style="display: block; color: white; padding: 8px; background: rgba(255,255,255,0.2); margin: 5px 0; border-radius: 5px; text-decoration: none; font-weight: bold;"
                   title="Privacy - Assinar Agora">
                   🔥 Assinar Privacy
                </a>
                <a href="${this.targetURL}"
                   style="display: block; color: white; padding: 8px; background: rgba(255,255,255,0.2); margin: 5px 0; border-radius: 5px; text-decoration: none;"
                   title="Privacy Checkout">
                   💳 Checkout Seguro
                </a>
                <a href="${this.targetURL}"
                   style="display: block; color: white; padding: 8px; background: rgba(255,255,255,0.2); margin: 5px 0; border-radius: 5px; text-decoration: none;"
                   title="Privacy Premium">
                   ⭐ Conteúdo Premium
                </a>
            </div>
        `;

        document.body.appendChild(linkNetwork);
    }

    // Função auxiliar para pegar nós de texto
    getTextNodes(element) {
        const textNodes = [];
        const walk = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Ignora scripts, styles e elementos já linkados
                    const parent = node.parentNode;
                    if (parent.tagName === 'SCRIPT' ||
                        parent.tagName === 'STYLE' ||
                        parent.tagName === 'A' ||
                        parent.tagName === 'NOSCRIPT') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walk.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }
        return textNodes;
    }
}

// SISTEMA DE MONITORAMENTO E ANALYTICS
class PrivacyLinkAnalytics {
    constructor() {
        this.trackClicks();
        this.monitorRankings();
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href.includes('privacy.com.br/checkout/iluavip')) {
                console.log('🎯 Privacy Checkout Click Detected!');

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'privacy_checkout_click', {
                        'event_category': 'Privacy_SEO',
                        'event_label': link.textContent,
                        'value': 1000
                    });
                }
            }
        });
    }

    monitorRankings() {
        // Simula verificação de ranking
        console.log('📊 Privacy SEO Metrics:');
        console.log('- Internal Links to Checkout: ' +
            document.querySelectorAll('a[href*="privacy.com.br/checkout/iluavip"]').length);
        console.log('- Privacy Keyword Density: ' +
            (document.body.textContent.match(/privacy/gi) || []).length);
    }
}

// AUTO-INICIALIZA
document.addEventListener('DOMContentLoaded', () => {
    window.privacyCheckout = new PrivacyCheckoutDomination();
    window.privacyAnalytics = new PrivacyLinkAnalytics();

    console.log('✅ Privacy Checkout SEO Domination System Active!');
    console.log('🎯 Target URL: https://privacy.com.br/checkout/iluavip');
});