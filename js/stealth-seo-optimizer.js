/**
 * STEALTH SEO OPTIMIZER
 * Estratégias avançadas de SEO invisíveis ao usuário
 * Técnicas que 99% dos sites não implementam
 */

class StealthSEOOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Executa após o DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyOptimizations());
        } else {
            this.applyOptimizations();
        }
    }

    applyOptimizations() {
        this.optimizeImageAltTags();
        this.addSemanticHTML5();
        this.implementLinkAttributes();
        this.addHiddenSemanticText();
        this.optimizeMetaTags();
        this.addInternalLinkingContext();
        this.implementEntityMarkup();
        this.addHiddenKeywords();
        this.optimizeLinkTitles();
        this.addAccessibilityBoost();
    }

    // 1. OTIMIZAÇÃO AUTOMÁTICA DE ALT TAGS
    optimizeImageAltTags() {
        const images = document.querySelectorAll('img');
        const keywords = ['Luana Couto', 'iluavip', 'modelo', 'Privacy', 'conteúdo exclusivo'];

        images.forEach((img, index) => {
            if (!img.alt || img.alt.length < 10) {
                // Cria alt text rico em SEO
                const keyword = keywords[index % keywords.length];
                const context = img.closest('section')?.id || 'content';
                img.alt = `${keyword} - ${context} - Foto exclusiva ${index + 1}`;
                img.title = img.title || img.alt;
            }
        });
    }

    // 2. ADICIONA MARCAÇÃO SEMÂNTICA HTML5
    addSemanticHTML5() {
        // Adiciona atributos de microformatos
        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent) {
            mainContent.setAttribute('itemscope', '');
            mainContent.setAttribute('itemtype', 'https://schema.org/WebPage');
            mainContent.setAttribute('role', 'main');
        }

        // Marca seções importantes
        document.querySelectorAll('section').forEach(section => {
            if (!section.getAttribute('aria-label')) {
                const heading = section.querySelector('h1, h2, h3');
                if (heading) {
                    section.setAttribute('aria-label', heading.textContent);
                    section.setAttribute('role', 'region');
                }
            }
        });
    }

    // 3. IMPLEMENTA ATRIBUTOS AVANÇADOS DE LINKS
    implementLinkAttributes() {
        document.querySelectorAll('a').forEach(link => {
            const href = link.href;

            // Links internos - máximo juice
            if (href.includes('luanacouto.com.br')) {
                link.setAttribute('rel', 'dofollow');
                if (!link.getAttribute('title')) {
                    link.setAttribute('title', link.textContent + ' - Luana Couto');
                }
            }

            // Links para Privacy - super boost
            if (href.includes('privacy.com.br')) {
                link.setAttribute('rel', 'dofollow sponsored');
                link.setAttribute('data-priority', 'high');
                link.setAttribute('itemprop', 'url');

                // Adiciona contexto invisível
                if (!link.querySelector('.sr-only')) {
                    const span = document.createElement('span');
                    span.className = 'sr-only';
                    span.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;';
                    span.textContent = ' - Acesse agora o conteúdo exclusivo no Privacy.com.br';
                    link.appendChild(span);
                }
            }

            // Links externos - nofollow
            if (!href.includes('luanacouto.com.br') && !href.includes('privacy.com.br')) {
                link.setAttribute('rel', 'nofollow noopener');
            }
        });
    }

    // 4. ADICIONA TEXTO SEMÂNTICO OCULTO
    addHiddenSemanticText() {
        // Cria um container invisível mas legível para crawlers
        if (!document.getElementById('seo-context')) {
            const seoContext = document.createElement('div');
            seoContext.id = 'seo-context';
            seoContext.setAttribute('aria-hidden', 'true');
            seoContext.style.cssText = 'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;';

            seoContext.innerHTML = `
                <h1>Luana Couto - Modelo Premium Brasileira</h1>
                <p>Perfil oficial de Luana Couto (iluavip) na plataforma Privacy.com.br.</p>
                <p>Conteúdo exclusivo, ensaios sensuais, acompanhante de luxo em São Paulo.</p>
                <nav aria-label="Links importantes">
                    <a href="https://privacy.com.br/checkout/iluavip">Privacy - Assinar Agora</a>
                    <a href="https://luanacouto.com.br">Site Oficial Luana Couto</a>
                </nav>
            `;

            document.body.appendChild(seoContext);
        }
    }

    // 5. OTIMIZAÇÃO DE META TAGS DINÂMICAS
    optimizeMetaTags() {
        // Adiciona meta tags que faltam
        const metaTags = {
            'og:locale': 'pt_BR',
            'og:locale:alternate': 'en_US',
            'og:site_name': 'Luana Couto Official',
            'article:author': 'Luana Couto',
            'article:publisher': 'https://luanacouto.com.br',
            'twitter:site': '@iluavip',
            'twitter:creator': '@iluavip',
            'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'bingbot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        };

        Object.entries(metaTags).forEach(([property, content]) => {
            if (!document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)) {
                const meta = document.createElement('meta');
                if (property.startsWith('og:') || property.startsWith('twitter:')) {
                    meta.setAttribute('property', property);
                } else {
                    meta.setAttribute('name', property);
                }
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        });
    }

    // 6. CONTEXTO DE LINKING INTERNO
    addInternalLinkingContext() {
        // Adiciona atributos de contexto em elementos importantes
        const importantElements = document.querySelectorAll('.hero-content, .about-content, .package-item');

        importantElements.forEach(element => {
            element.setAttribute('itemscope', '');
            element.setAttribute('itemtype', 'https://schema.org/Article');

            const heading = element.querySelector('h1, h2, h3');
            if (heading) {
                heading.setAttribute('itemprop', 'headline');
            }

            const paragraph = element.querySelector('p');
            if (paragraph) {
                paragraph.setAttribute('itemprop', 'description');
            }
        });
    }

    // 7. IMPLEMENTA ENTITY MARKUP
    implementEntityMarkup() {
        // Marca menções da pessoa
        const textElements = document.querySelectorAll('p, span, h1, h2, h3');

        textElements.forEach(element => {
            if (element.textContent.includes('Luana Couto') && !element.querySelector('[itemscope]')) {
                element.innerHTML = element.innerHTML.replace(
                    /Luana Couto/g,
                    '<span itemscope itemtype="https://schema.org/Person" itemprop="name">Luana Couto</span>'
                );
            }
        });
    }

    // 8. ADICIONA KEYWORDS OCULTAS ESTRATÉGICAS
    addHiddenKeywords() {
        // Adiciona keywords em comentários HTML (Google lê)
        const keywordComments = [
            '<!-- Luana Couto - Modelo Brasileira - Privacy.com.br/Profile/iluavip -->',
            '<!-- iluavip - Conteúdo Exclusivo - Acompanhante de Luxo SP -->',
            '<!-- Privacy Brasil - OnlyFans Alternative - Telegram VIP -->',
            '<!-- Ensaios Sensuais - Luana Couto GP - Atriz Adulto -->'
        ];

        keywordComments.forEach(comment => {
            const commentNode = document.createComment(comment.replace('<!--', '').replace('-->', ''));
            document.head.appendChild(commentNode);
        });
    }

    // 9. OTIMIZA TÍTULOS DE LINKS
    optimizeLinkTitles() {
        document.querySelectorAll('a').forEach(link => {
            if (!link.title) {
                const text = link.textContent.trim();
                const href = link.href;

                if (href.includes('privacy')) {
                    link.title = `${text} - Privacy.com.br Conteúdo Exclusivo de Luana Couto`;
                } else if (href.includes('instagram')) {
                    link.title = `${text} - Siga @iluavip no Instagram`;
                } else if (href.includes('twitter')) {
                    link.title = `${text} - Siga @iluavip no Twitter`;
                } else {
                    link.title = `${text} - Luana Couto Official`;
                }
            }
        });
    }

    // 10. BOOST DE ACESSIBILIDADE (Google adora sites acessíveis)
    addAccessibilityBoost() {
        // Adiciona ARIA labels em elementos interativos
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });

        // Adiciona skip links (invisíveis mas úteis)
        if (!document.getElementById('skip-links')) {
            const skipLinks = document.createElement('div');
            skipLinks.id = 'skip-links';
            skipLinks.innerHTML = `
                <a href="#main" class="skip-link">Pular para conteúdo principal</a>
                <a href="#performance" class="skip-link">Ver performance</a>
                <a href="#about" class="skip-link">Sobre Luana Couto</a>
            `;
            skipLinks.style.cssText = 'position: absolute; top: -40px; left: 0; background: #000; color: #fff; padding: 8px; z-index: 100; text-decoration: none;';
            document.body.insertBefore(skipLinks, document.body.firstChild);

            // CSS para mostrar apenas no focus
            const style = document.createElement('style');
            style.textContent = '.skip-link:focus { top: 0 !important; }';
            document.head.appendChild(style);
        }

        // Adiciona lang attributes
        document.querySelectorAll('[lang]').forEach(element => {
            if (element.textContent.match(/[a-zA-Z]/)) {
                element.setAttribute('translate', 'yes');
            }
        });
    }
}

// Auto-inicializa
new StealthSEOOptimizer();

// Monitora mudanças no DOM e reaplica otimizações
const observer = new MutationObserver((mutations) => {
    // Reaplica otimizações em novo conteúdo
    setTimeout(() => {
        new StealthSEOOptimizer();
    }, 1000);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('⚡ Stealth SEO Optimizer loaded - Invisible optimizations active');