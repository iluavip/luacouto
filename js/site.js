/* =====================================================================
   Luana Couto — interações e animações (vanilla JS, sem dependências)
   ===================================================================== */
(function () {
    "use strict";

    var doc = document;
    var root = doc.documentElement;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

    /*============= PRELOADER ============= */
    var preloader = $(".preloader");
    function hidePreloader() {
        if (!preloader || preloader.classList.contains("is-done")) { return; }
        preloader.classList.add("is-done");
        root.classList.add("is-loaded");
    }
    if (preloader) {
        // Sai assim que o 1º vídeo do hero estiver tocando (ou a página carregar),
        // nunca antes de 500 ms (evita "piscar") nem depois de 1,2 s.
        var started = Date.now();
        var done = function () { setTimeout(hidePreloader, Math.max(0, 500 - (Date.now() - started))); };
        var firstVideo = $(".video-top");
        if (firstVideo) { firstVideo.addEventListener("playing", done, { once: true }); }
        if (doc.readyState === "complete") { done(); } else { window.addEventListener("load", done); }
        setTimeout(hidePreloader, 1200);
    } else {
        root.classList.add("is-loaded");
    }

    /*============= VÍDEO TRIPLO — CARREGAMENTO INTELIGENTE =============
       - Mantém a dessincronização (offsets de tempo) para parecerem 3 vídeos.
       - Pausa os 3 quando o hero sai da tela (economiza CPU/bateria no mobile)
         e retoma quando volta. */
    var bgVideos = [
        { el: $(".video-top"), offset: 0 },
        { el: $(".video-mid"), offset: 5 },   // começa aos 5s
        { el: $(".video-bottom"), offset: 9 } // começa aos 9s (clipe tem ~9,5s)
    ].filter(function (v) { return v.el; });

    if (bgVideos.length) {
        // O autoplay é NATIVO (atributos autoplay/muted/playsinline no HTML e
        // <source media> escolhendo a versão leve no celular). O JS só aplica
        // os offsets e garante a retomada em casos de bloqueio/restauração.
        var tryPlay = function (v) {
            if (!v.el.paused) { return; }
            var p = v.el.play();
            if (p && p.catch) { p.catch(function () {}); }
        };
        // O ponto de partida já vem no próprio src (#t=5 / #t=9). Isto é só a
        // garantia: se o navegador ignorar o fragmento ou recarregar o vídeo
        // (evento "emptied"), reposiciona uma única vez por carregamento.
        var applyOffset = function (v) {
            if (!v.offset || v.applied || !isFinite(v.el.duration)) { return; }
            v.applied = true;
            if (v.el.currentTime < v.offset - 0.5) {
                try { v.el.currentTime = Math.min(v.offset, v.el.duration - 0.2); } catch (e) {}
            }
        };

        bgVideos.forEach(function (v) {
            v.el.muted = true;
            v.el.defaultMuted = true;
            v.el.playsInline = true;
            v.el.addEventListener("loadedmetadata", function () { applyOffset(v); });
            v.el.addEventListener("emptied", function () { v.applied = false; });
            v.el.addEventListener("canplay", function () { tryPlay(v); });
        });

        // O vídeo fica declarado no HTML (<source> com #t=5 / #t=9): é o que o
        // Safari do iPhone exige para dar play sozinho. Injetar o src via JS
        // (ex.: Blob para baixar uma vez só) fazia o iPhone esperar um toque
        // ou rolagem para começar. Aqui só garantimos o play e os offsets.
        bgVideos.forEach(function (v) {
            if (v.el.readyState >= 1) { applyOffset(v); }
            tryPlay(v);
        });

        var resumeAll = function () { bgVideos.forEach(tryPlay); };

        // Reabertura do link: o celular pode restaurar a página da memória
        // (bfcache / aba em segundo plano) com os vídeos pausados.
        window.addEventListener("pageshow", resumeAll);
        doc.addEventListener("visibilitychange", function () {
            if (doc.visibilityState === "visible") { resumeAll(); }
        });
        // Rede de segurança: tenta de novo algumas vezes nos primeiros segundos.
        [500, 1500, 3000].forEach(function (ms) { setTimeout(resumeAll, ms); });

        // Último recurso: primeiro toque/rolagem do usuário.
        var gestureEvents = ["touchstart", "click", "scroll"];
        var resumeOnGesture = function () {
            resumeAll();
            gestureEvents.forEach(function (evt) { window.removeEventListener(evt, resumeOnGesture); });
        };
        gestureEvents.forEach(function (evt) {
            window.addEventListener(evt, resumeOnGesture, { passive: true });
        });

        // Pausa quando o hero sai da tela e retoma quando volta.
        var heroArea = $(".hero-media") || $(".hero");
        if ("IntersectionObserver" in window && heroArea) {
            new IntersectionObserver(function (entries) {
                var visible = entries[0] && entries[0].isIntersecting;
                bgVideos.forEach(function (v) {
                    if (visible) { tryPlay(v); } else { v.el.pause(); }
                });
            }, { threshold: 0.01 }).observe(heroArea);
        }
    }

    /*============= TÍTULO DO HERO — LETRA A LETRA ============= */
    $$("[data-split-chars]").forEach(function (el) {
        var i = 0;
        $$(".line", el).forEach(function (line) {
            var walker = doc.createTreeWalker(line, NodeFilter.SHOW_TEXT);
            var nodes = [];
            while (walker.nextNode()) { nodes.push(walker.currentNode); }
            nodes.forEach(function (node) {
                var frag = doc.createDocumentFragment();
                node.textContent.split("").forEach(function (ch) {
                    if (ch === " ") { frag.appendChild(doc.createTextNode(" ")); return; }
                    var s = doc.createElement("span");
                    s.className = "char";
                    s.setAttribute("aria-hidden", "true");
                    s.style.setProperty("--i", i++);
                    s.textContent = ch;
                    frag.appendChild(s);
                });
                node.parentNode.replaceChild(frag, node);
            });
        });
        // Leitores de tela continuam lendo o texto inteiro
        el.setAttribute("aria-label", el.getAttribute("data-split-chars"));
    });

    /*============= TÍTULOS — PALAVRA A PALAVRA ============= */
    $$("[data-split-words]").forEach(function (el) {
        var w = 0;
        var walk = function (node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = doc.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) { return; }
                        if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(" ")); return; }
                        var outer = doc.createElement("span");
                        outer.className = "split-word";
                        var inner = doc.createElement("span");
                        inner.style.setProperty("--w", w++);
                        inner.textContent = part;
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                    });
                    child.parentNode.replaceChild(frag, child);
                } else if (child.nodeType === 1 && child.tagName !== "BR") {
                    walk(child);
                }
            });
        };
        walk(el);
        el.setAttribute("data-reveal-self", "");
    });

    /*============= REVELAÇÃO AO ROLAR + CONTADORES + BARRAS ============= */
    function formatNumber(n, el) {
        var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        var sep = el.getAttribute("data-sep");
        var fixed = n.toFixed(decimals);
        if (sep) {
            var parts = fixed.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
            fixed = parts.join(sep === "." ? "," : ".");
        }
        return (el.getAttribute("data-prefix") || "") + fixed + (el.getAttribute("data-suffix") || "");
    }

    function countUp(el) {
        if (el.dataset.counted) { return; }
        el.dataset.counted = "1";
        var target = parseFloat(el.getAttribute("data-count"));
        if (isNaN(target) || reduceMotion) { return; }
        var finalText = el.textContent;
        var duration = 1800;
        var start = null;
        var step = function (ts) {
            if (!start) { start = ts; }
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 4);
            el.textContent = formatNumber(target * eased, el);
            if (p < 1) { requestAnimationFrame(step); }
            else { el.textContent = finalText; }
        };
        requestAnimationFrame(step);
    }

    var revealTargets = $$("[data-reveal], [data-reveal-self], .bar, [data-count]");
    if ("IntersectionObserver" in window && !reduceMotion) {
        var revealIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) { return; }
                var el = entry.target;
                if (el._clipChildren) {
                    el._clipChildren.forEach(function (child) { child.classList.add("is-visible"); });
                    revealIO.unobserve(el);
                    return;
                }
                el.classList.add("is-visible");
                if (el.hasAttribute("data-count")) { countUp(el); }
                revealIO.unobserve(el);
            });
        }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
        revealTargets.forEach(function (el) {
            // Um elemento recortado por inteiro (clip-path) não "intersecta":
            // observamos o pai e repassamos a classe.
            if (el.getAttribute("data-reveal") === "clip" && el.parentElement) {
                var parent = el.parentElement;
                parent._clipChildren = (parent._clipChildren || []).concat(el);
                revealIO.observe(parent);
            } else {
                revealIO.observe(el);
            }
        });
    } else {
        revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /*============= HEADER, PROGRESSO E VOLTAR AO TOPO ============= */
    var header = $(".site-header");
    var progress = $(".scroll-progress");
    var toTop = $(".to-top");
    var floatLinks = $(".float-links");
    var lastY = window.pageYOffset;
    var ticking = false;

    function onScroll() {
        var y = window.pageYOffset;
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        if (progress) { progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")"; }
        if (header) {
            header.classList.toggle("is-scrolled", y > 40);
            var menuOpen = doc.body.classList.contains("menu-open");
            header.classList.toggle("is-hidden", !menuOpen && y > 600 && y > lastY + 4);
            if (y < lastY - 4) { header.classList.remove("is-hidden"); }
        }
        if (toTop) { toTop.classList.toggle("is-visible", y > 900); }
        if (floatLinks) { floatLinks.classList.toggle("is-visible", y > window.innerHeight * 0.6); }
        parallax();
        lastY = y;
        ticking = false;
    }
    window.addEventListener("scroll", function () {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });

    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

    /*============= PARALLAX (desktop) ============= */
    var parallaxEls = $$("[data-parallax]");
    function parallax() {
        if (reduceMotion || !finePointer || !parallaxEls.length) { return; }
        var vh = window.innerHeight;
        parallaxEls.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > vh + 200) { return; }
            var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
            var center = r.top + r.height / 2 - vh / 2;
            var target = el.querySelector("img") && !el.classList.contains("finale-bg") ? el.querySelector("img") : el;
            target.style.setProperty("--py", (center * -speed).toFixed(1) + "px");
        });
    }
    onScroll();

    /*============= SEÇÃO ATIVA NO MENU ============= */
    var navLinks = $$(".nav-desktop a[href^='#']");
    if (navLinks.length && "IntersectionObserver" in window) {
        var sectionIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) { return; }
                navLinks.forEach(function (a) {
                    var active = a.getAttribute("href") === "#" + entry.target.id;
                    a.classList.toggle("is-active", active);
                    if (active) { a.setAttribute("aria-current", "true"); } else { a.removeAttribute("aria-current"); }
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        navLinks.forEach(function (a) {
            var sec = $(a.getAttribute("href"));
            if (sec) { sectionIO.observe(sec); }
        });
    }

    /*============= MENU MOBILE ============= */
    var toggle = $(".menu-toggle");
    var mobileMenu = $(".mobile-menu");
    function setMenu(open) {
        doc.body.classList.toggle("menu-open", open);
        if (toggle) { toggle.setAttribute("aria-expanded", open ? "true" : "false"); }
        if (mobileMenu) {
            if (open) { mobileMenu.removeAttribute("inert"); } else { mobileMenu.setAttribute("inert", ""); }
            mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
        }
        if (open && header) { header.classList.remove("is-hidden"); }
    }
    if (toggle && mobileMenu) {
        setMenu(false);
        toggle.addEventListener("click", function () {
            setMenu(!doc.body.classList.contains("menu-open"));
        });
        $$("a", mobileMenu).forEach(function (a) {
            a.addEventListener("click", function () { setMenu(false); });
        });
        doc.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && doc.body.classList.contains("menu-open")) { setMenu(false); toggle.focus(); }
        });
        window.addEventListener("resize", function () {
            if (window.innerWidth >= 992 && doc.body.classList.contains("menu-open")) { setMenu(false); }
        });
    }

    /*============= ABAS (estatísticas por plataforma) ============= */
    $$("[data-tabs]").forEach(function (tabsRoot) {
        var tabs = $$("[role='tab']", tabsRoot);
        var indicator = $(".tab-indicator", tabsRoot);
        var list = $("[role='tablist']", tabsRoot);

        function moveIndicator(tab) {
            if (!indicator || !tab) { return; }
            indicator.style.width = tab.offsetWidth + "px";
            indicator.style.transform = "translateX(" + tab.offsetLeft + "px)";
        }

        function select(tab, focus) {
            tabs.forEach(function (t) {
                var on = t === tab;
                t.setAttribute("aria-selected", on ? "true" : "false");
                t.tabIndex = on ? 0 : -1;
                var panel = doc.getElementById(t.getAttribute("aria-controls"));
                if (!panel) { return; }
                if (on) {
                    panel.hidden = false;
                    panel.classList.remove("is-entering");
                    void panel.offsetWidth;
                    panel.classList.add("is-entering");
                    // Dispara contadores/barras do painel recém-aberto
                    $$("[data-count]", panel).forEach(function (el) {
                        if (el.getBoundingClientRect().top < window.innerHeight) { countUp(el); }
                    });
                    $$(".bar", panel).forEach(function (el) {
                        el.classList.remove("is-visible");
                        void el.offsetWidth;
                        requestAnimationFrame(function () { el.classList.add("is-visible"); });
                    });
                } else {
                    panel.hidden = true;
                }
            });
            moveIndicator(tab);
            if (focus) { tab.focus(); }
            if (list && tab.scrollIntoView && list.scrollWidth > list.clientWidth) {
                list.scrollTo({ left: tab.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
            }
        }

        tabs.forEach(function (tab, idx) {
            tab.addEventListener("click", function () { select(tab, false); });
            tab.addEventListener("keydown", function (e) {
                var next = null;
                if (e.key === "ArrowRight") { next = tabs[(idx + 1) % tabs.length]; }
                if (e.key === "ArrowLeft") { next = tabs[(idx - 1 + tabs.length) % tabs.length]; }
                if (e.key === "Home") { next = tabs[0]; }
                if (e.key === "End") { next = tabs[tabs.length - 1]; }
                if (next) { e.preventDefault(); select(next, true); }
            });
        });

        var current = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
        moveIndicator(current);
        window.addEventListener("resize", function () {
            moveIndicator(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0]);
        });
        if (doc.fonts && doc.fonts.ready) { doc.fonts.ready.then(function () { moveIndicator(current); }); }
    });

    /*============= FILTRO DA GALERIA ============= */
    var filters = $$("[data-filter]");
    var shots = $$(".shot");
    filters.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var value = btn.getAttribute("data-filter");
            filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
            shots.forEach(function (shot) {
                var show = value === "all" || shot.getAttribute("data-category") === value;
                if (show) {
                    shot.classList.remove("is-hidden");
                    shot.classList.add("is-filtering");
                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () { shot.classList.remove("is-filtering"); });
                    });
                } else {
                    shot.classList.add("is-hidden");
                }
            });
        });
    });

    /*============= LIGHTBOX ============= */
    var lb = $(".lightbox");
    if (lb) {
        var lbImg = $("img", lb);
        var lbCap = $("figcaption", lb);
        var lbCount = $(".lb-count", lb);
        var lastFocus = null;
        var index = 0;

        var visibleShots = function () { return shots.filter(function (s) { return !s.classList.contains("is-hidden"); }); };

        var show = function (i) {
            var list = visibleShots();
            if (!list.length) { return; }
            index = (i + list.length) % list.length;
            var link = $(".shot-open", list[index]);
            lbImg.style.opacity = "0";
            lbImg.onload = function () { lbImg.style.opacity = "1"; };
            lbImg.src = link.getAttribute("href");
            lbImg.alt = $("img", list[index]).alt;
            var credit = $(".shot-credit", list[index]);
            lbCap.innerHTML = credit ? (lb.getAttribute("data-label-photo") || "Foto") + ": <b></b>" : "";
            if (credit) { $("b", lbCap).textContent = credit.textContent.trim(); }
            lbCount.textContent = (index + 1) + " / " + list.length;
        };

        var open = function (shot) {
            lastFocus = doc.activeElement;
            show(visibleShots().indexOf(shot));
            lb.hidden = false;
            requestAnimationFrame(function () { lb.classList.add("is-open"); });
            doc.body.style.overflow = "hidden";
            $(".lb-close", lb).focus();
        };

        var close = function () {
            lb.classList.remove("is-open");
            doc.body.style.overflow = "";
            setTimeout(function () { lb.hidden = true; }, 400);
            if (lastFocus) { lastFocus.focus(); }
        };

        shots.forEach(function (shot) {
            var link = $(".shot-open", shot);
            if (!link) { return; }
            link.addEventListener("click", function (e) { e.preventDefault(); open(shot); });
        });
        $(".lb-close", lb).addEventListener("click", close);
        $(".lb-prev", lb).addEventListener("click", function () { show(index - 1); });
        $(".lb-next", lb).addEventListener("click", function () { show(index + 1); });
        lb.addEventListener("click", function (e) { if (e.target === lb) { close(); } });
        doc.addEventListener("keydown", function (e) {
            if (lb.hidden) { return; }
            if (e.key === "Escape") { close(); }
            if (e.key === "ArrowLeft") { show(index - 1); }
            if (e.key === "ArrowRight") { show(index + 1); }
            if (e.key === "Tab") {
                // mantém o foco dentro do lightbox
                var f = $$("button", lb);
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        var touchX = null;
        lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener("touchend", function (e) {
            if (touchX === null) { return; }
            var dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) { show(index + (dx < 0 ? 1 : -1)); }
            touchX = null;
        });
    }

    /*============= TILT 3D + BRILHO NOS CARDS / BOTÕES MAGNÉTICOS ============= */
    if (finePointer && !reduceMotion) {
        $$("[data-tilt]").forEach(function (card) {
            card.addEventListener("pointermove", function (e) {
                var r = card.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width;
                var y = (e.clientY - r.top) / r.height;
                card.style.setProperty("--ry", ((x - 0.5) * 7).toFixed(2) + "deg");
                card.style.setProperty("--rx", ((0.5 - y) * 7).toFixed(2) + "deg");
                card.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
                card.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
            });
            card.addEventListener("pointerleave", function () {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });

        $$("[data-magnetic]").forEach(function (btn) {
            btn.addEventListener("pointermove", function (e) {
                var r = btn.getBoundingClientRect();
                btn.style.setProperty("--mx", ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px");
                btn.style.setProperty("--my", ((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1) + "px");
            });
            btn.addEventListener("pointerleave", function () {
                btn.style.setProperty("--mx", "0px");
                btn.style.setProperty("--my", "0px");
            });
        });
    }

    /*============= GA4 — CLIQUES DE CONVERSÃO ============= */
    $$("[data-track]").forEach(function (el) {
        el.addEventListener("click", function () {
            if (typeof window.gtag === "function") {
                window.gtag("event", "conversion_click", {
                    event_category: "Engagement",
                    event_label: el.getAttribute("data-track") || (el.innerText || "").trim(),
                    value: 1
                });
            }
        });
    });

    /*============= SUGESTÃO DE IDIOMA =============
       Mostra "This site is also available in English" para quem tem o navegador
       em outro idioma (e o inverso na versão em inglês). Não redireciona:
       a escolha é do visitante. Fechar guarda a preferência no navegador. */
    var hint = $("[data-lang-hint]");
    if (hint) {
        var target = hint.getAttribute("data-lang-hint");
        var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""])
            .map(function (l) { return String(l).toLowerCase(); });
        var prefersPt = langs.some(function (l) { return l.indexOf("pt") === 0; });
        var wants = target === "en" ? !prefersPt : langs[0] && langs[0].indexOf("pt") === 0;
        var dismissed = false;
        try { dismissed = localStorage.getItem("langHintDismissed") === "1"; } catch (e) {}
        if (wants && !dismissed) {
            hint.hidden = false;
            setTimeout(function () { hint.classList.add("is-visible"); }, reduceMotion ? 0 : 1800);
            var closeHint = function () {
                hint.classList.remove("is-visible");
                try { localStorage.setItem("langHintDismissed", "1"); } catch (e) {}
                setTimeout(function () { hint.hidden = true; }, 500);
            };
            $(".lang-hint-close", hint).addEventListener("click", closeHint);
            $("a", hint).addEventListener("click", function () {
                try { localStorage.setItem("langHintDismissed", "1"); } catch (e) {}
            });
        }
    }

    /*============= ANO NO RODAPÉ ============= */
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
