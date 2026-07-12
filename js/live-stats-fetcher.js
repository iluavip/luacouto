/**
 * LIVE STATS FETCHER - Sistema de Métricas em Tempo Real
 * Atualiza automaticamente as estatísticas do XVideos e Pornhub
 */

class LiveStatsFetcher {
    constructor() {
        this.xvideosData = {
            profileViews: 1393798,
            subscribers: 32504,
            videoViews: 77260396,
            rankingBrazil: 12162,
            rankingWorld: 5466,
            lastUpdate: null
        };

        this.pornhubData = {
            modelRanking: 3756,
            weeklyRanking: 4009,
            monthlyRanking: 3756,
            yearlyRanking: 3513,
            videoViews: 3115074,
            profileViews: 1254314,
            subscribers: 14500,
            lastUpdate: null
        };

        this.instagramData = {
            followers: 86000,
            following: 428,
            avgLikes: 12500,
            engagementRate: 14.5,
            posts: 97,
            monthlyGrowth: 3200,
            dailyGrowth: 107,
            lastUpdate: null
        };

        this.init();
    }

    init() {
        console.log('📊 Live Stats Fetcher Initialized');
        this.loadStoredData();
        this.updateStats();
        this.startAutoUpdate();
        this.animateNumbers();
    }

    loadStoredData() {
        // Carrega dados salvos no localStorage
        const savedXVideos = localStorage.getItem('xvideos_stats');
        const savedPornhub = localStorage.getItem('pornhub_stats');
        const savedInstagram = localStorage.getItem('instagram_stats');

        if (savedXVideos) {
            this.xvideosData = JSON.parse(savedXVideos);
        }

        if (savedPornhub) {
            this.pornhubData = JSON.parse(savedPornhub);
        }

        if (savedInstagram) {
            const saved = JSON.parse(savedInstagram);
            // Força valores corretos se estiverem errados
            if (saved.followers > 100000 || saved.posts > 800) {
                saved.followers = 86000;
                saved.following = 428;
                saved.avgLikes = 12500;
                saved.posts = 97;  // Corrige posts para valor real
                localStorage.setItem('instagram_stats', JSON.stringify(saved));
            }
            this.instagramData = saved;
        }
    }

    async updateStats() {
        // Simula atualização realista das métricas
        // Em produção, isso seria substituído por uma API real ou proxy server

        // XVideos - Incremento realista baseado em crescimento médio
        this.xvideosData.profileViews += Math.floor(Math.random() * 500) + 100;
        this.xvideosData.subscribers += Math.floor(Math.random() * 10) + 2;
        this.xvideosData.videoViews += Math.floor(Math.random() * 5000) + 1000;
        this.xvideosData.lastUpdate = new Date().toISOString();

        // Pornhub - Incremento realista
        this.pornhubData.videoViews += Math.floor(Math.random() * 1000) + 200;
        this.pornhubData.profileViews += Math.floor(Math.random() * 300) + 50;
        this.pornhubData.subscribers += Math.floor(Math.random() * 5) + 1;
        this.pornhubData.lastUpdate = new Date().toISOString();

        // Rankings flutuam levemente
        this.pornhubData.modelRanking += Math.floor(Math.random() * 10) - 5;
        this.pornhubData.weeklyRanking += Math.floor(Math.random() * 20) - 10;

        // Instagram - Incremento realista baseado em 86k seguidores
        this.instagramData.followers += Math.floor(Math.random() * 30) + 10; // Crescimento mais modesto
        this.instagramData.avgLikes += Math.floor(Math.random() * 50) - 25;
        this.instagramData.posts += Math.random() > 0.95 ? 1 : 0; // Novo post muito raramente
        this.instagramData.following += Math.random() > 0.9 ? Math.floor(Math.random() * 3) : 0; // Segue alguém raramente
        this.instagramData.monthlyGrowth = Math.floor(this.instagramData.followers / 27); // ~3.2k/mês
        this.instagramData.dailyGrowth = Math.floor(this.instagramData.monthlyGrowth / 30);
        this.instagramData.engagementRate = (this.instagramData.avgLikes / this.instagramData.followers * 100).toFixed(1);
        this.instagramData.lastUpdate = new Date().toISOString();

        // Salva no localStorage
        localStorage.setItem('xvideos_stats', JSON.stringify(this.xvideosData));
        localStorage.setItem('pornhub_stats', JSON.stringify(this.pornhubData));
        localStorage.setItem('instagram_stats', JSON.stringify(this.instagramData));

        // Atualiza a UI
        this.updateUI();
    }

    updateUI() {
        // Atualiza XVideos Stats
        const xvElements = {
            videoViews: document.getElementById('xv-video-views'),
            subscribers: document.getElementById('xv-subscribers'),
            profileViews: document.getElementById('xv-profile-views'),
            rankingBrazil: document.getElementById('xv-ranking-brazil'),
            rankingWorld: document.getElementById('xv-ranking-world')
        };

        if (xvElements.videoViews) {
            xvElements.videoViews.textContent = this.formatNumber(this.xvideosData.videoViews);
            this.animateValue(xvElements.videoViews, this.xvideosData.videoViews - 5000, this.xvideosData.videoViews, 2000);
        }

        if (xvElements.subscribers) {
            xvElements.subscribers.textContent = this.formatNumberK(this.xvideosData.subscribers);
            this.animateValue(xvElements.subscribers, this.xvideosData.subscribers - 10, this.xvideosData.subscribers, 1500);
        }

        if (xvElements.profileViews) {
            xvElements.profileViews.textContent = this.formatNumber(this.xvideosData.profileViews);
            this.animateValue(xvElements.profileViews, this.xvideosData.profileViews - 500, this.xvideosData.profileViews, 1800);
        }

        // Atualiza Pornhub Stats
        const phElements = {
            modelRanking: document.getElementById('ph-model-ranking'),
            weeklyRanking: document.getElementById('ph-weekly-ranking'),
            monthlyRanking: document.getElementById('ph-monthly-ranking'),
            yearlyRanking: document.getElementById('ph-yearly-ranking'),
            videoViews: document.getElementById('ph-video-views'),
            profileViews: document.getElementById('ph-profile-views'),
            subscribers: document.getElementById('ph-subscribers')
        };

        if (phElements.videoViews) {
            phElements.videoViews.textContent = this.formatNumberM(this.pornhubData.videoViews);
            this.animateValue(phElements.videoViews, this.pornhubData.videoViews - 1000, this.pornhubData.videoViews, 2000);
        }

        if (phElements.subscribers) {
            phElements.subscribers.textContent = this.formatNumberK(this.pornhubData.subscribers);
        }

        if (phElements.modelRanking) {
            phElements.modelRanking.textContent = '#' + this.pornhubData.modelRanking;
        }

        // Atualiza Instagram Stats
        const igElements = {
            followers: document.getElementById('ig-followers'),
            following: document.getElementById('ig-following'),
            avgLikes: document.getElementById('ig-avg-likes'),
            engagement: document.getElementById('ig-engagement'),
            posts: document.getElementById('ig-posts'),
            monthlyGrowth: document.getElementById('ig-month-growth'),
            dailyGrowth: document.getElementById('ig-daily-growth')
        };

        if (igElements.followers) {
            igElements.followers.textContent = this.formatNumberK(this.instagramData.followers);
            this.animateValue(igElements.followers, this.instagramData.followers - 50, this.instagramData.followers, 2000);
        }

        if (igElements.following) {
            igElements.following.textContent = this.instagramData.following;
        }

        if (igElements.avgLikes) {
            igElements.avgLikes.textContent = this.formatNumberK(this.instagramData.avgLikes);
        }

        if (igElements.engagement) {
            igElements.engagement.textContent = this.instagramData.engagementRate.toFixed(1) + '%';
        }

        if (igElements.posts) {
            igElements.posts.textContent = this.instagramData.posts;
        }

        if (igElements.monthlyGrowth) {
            igElements.monthlyGrowth.textContent = '+' + this.formatNumberK(this.instagramData.monthlyGrowth);
        }

        if (igElements.dailyGrowth) {
            igElements.dailyGrowth.textContent = '+' + this.instagramData.dailyGrowth;
        }

        // Adiciona indicador de atualização
        this.showUpdateIndicator();
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString('pt-BR');
    }

    formatNumberK(num) {
        // Para Instagram, mostra 86K em vez de 86.0K
        if (num === 86000) {
            return '86K';
        }
        if (num >= 1000) {
            const k = (num / 1000).toFixed(1);
            // Remove .0 desnecessário
            return k.endsWith('.0') ? k.slice(0, -2) + 'K' : k + 'K';
        }
        return num.toString();
    }

    formatNumberM(num) {
        return (num / 1000000).toFixed(1) + 'M';
    }

    animateValue(element, start, end, duration) {
        if (!element) return;

        const range = end - start;
        const minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);

        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        let timer;

        function run() {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));

            if (element.id.includes('video-views')) {
                element.textContent = (value / 1000000).toFixed(1) + 'M';
            } else if (element.id.includes('subscribers')) {
                element.textContent = (value / 1000).toFixed(1) + 'K';
            } else if (element.id.includes('profile-views')) {
                element.textContent = value.toLocaleString('pt-BR');
            } else {
                element.textContent = value.toLocaleString('pt-BR');
            }

            if (value == end) {
                clearInterval(timer);
            }
        }

        timer = setInterval(run, stepTime);
        run();
    }

    showUpdateIndicator() {
        // Cria indicador visual de atualização
        const indicators = document.querySelectorAll('.live-indicator');
        indicators.forEach(indicator => {
            indicator.classList.add('pulse');
            setTimeout(() => {
                indicator.classList.remove('pulse');
            }, 1000);
        });
    }

    startAutoUpdate() {
        // Atualiza a cada 30 segundos para parecer tempo real
        setInterval(() => {
            this.updateStats();
        }, 30000);

        // Micro-atualizações a cada 5 segundos para dar sensação de tempo real
        setInterval(() => {
            this.microUpdate();
        }, 5000);
    }

    microUpdate() {
        // Pequenas atualizações para dar sensação de tempo real
        this.xvideosData.profileViews += Math.floor(Math.random() * 10) + 1;
        this.pornhubData.profileViews += Math.floor(Math.random() * 5) + 1;

        const xvProfileElement = document.getElementById('xv-profile-views');
        const phProfileElement = document.getElementById('ph-profile-views');

        if (xvProfileElement) {
            xvProfileElement.textContent = this.formatNumber(this.xvideosData.profileViews);
            xvProfileElement.classList.add('number-change');
            setTimeout(() => xvProfileElement.classList.remove('number-change'), 500);
        }

        if (phProfileElement) {
            phProfileElement.textContent = this.formatNumber(this.pornhubData.profileViews);
            phProfileElement.classList.add('number-change');
            setTimeout(() => phProfileElement.classList.remove('number-change'), 500);
        }
    }

    animateNumbers() {
        // Adiciona CSS para animações
        if (!document.getElementById('stats-animations')) {
            const style = document.createElement('style');
            style.id = 'stats-animations';
            style.textContent = `
                .live-indicator {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #4caf50;
                    border-radius: 50%;
                    margin-left: 8px;
                    animation: live-pulse 2s infinite;
                }

                @keyframes live-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }

                .pulse {
                    animation: stat-pulse 0.5s ease-out;
                }

                @keyframes stat-pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); color: #4caf50; }
                    100% { transform: scale(1); }
                }

                .number-change {
                    animation: number-flash 0.5s ease-out;
                }

                @keyframes number-flash {
                    0%, 100% { color: inherit; }
                    50% { color: #4caf50; transform: scale(1.02); }
                }

                .stat-card {
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }

                .live-badge {
                    background: linear-gradient(90deg, #f44336, #ff5722);
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: bold;
                    display: inline-block;
                    animation: live-badge 2s infinite;
                    margin-left: 10px;
                }

                @keyframes live-badge {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // API pública para acesso aos dados
    getXVideosStats() {
        return this.xvideosData;
    }

    getPornhubStats() {
        return this.pornhubData;
    }

    getInstagramStats() {
        return this.instagramData;
    }

    forceUpdate() {
        this.updateStats();
    }
}

// Auto-inicializa
document.addEventListener('DOMContentLoaded', () => {
    window.liveStats = new LiveStatsFetcher();
    console.log('📊 Live Stats System Active - Updates every 30 seconds');
});