/**
 * RESET INSTAGRAM STATS - Script para resetar e corrigir valores
 * Execute este script para forçar os valores corretos do Instagram
 */

// Limpa dados antigos incorretos
localStorage.removeItem('instagram_stats');
localStorage.removeItem('xvideos_stats');
localStorage.removeItem('pornhub_stats');

// Define valores corretos do Instagram @iluavip
const correctInstagramData = {
    followers: 92000,       // 92 mil seguidores (perfil público, nov/2026)
    following: 702,         // 702 seguindo (perfil público, nov/2026)
    avgLikes: 12500,       // Média realista de likes
    engagementRate: 14.5,  // Taxa de engajamento excelente
    posts: 111,            // Posts publicados (perfil público, nov/2026)
    monthlyGrowth: 3200,   // Crescimento mensal realista
    dailyGrowth: 107,      // Crescimento diário realista
    lastUpdate: new Date().toISOString()
};

// Define valores corretos do XVideos (atualizados)
const correctXVideosData = {
    profileViews: 1623638,
    subscribers: 37157,
    videoViews: 93869025,
    rankingBrazil: 12134,
    rankingWorld: 5185,
    lastUpdate: new Date().toISOString()
};

// Define valores corretos do Pornhub
const correctPornhubData = {
    modelRanking: 3575,
    weeklyRanking: 3552,
    monthlyRanking: 3575,
    yearlyRanking: 3570,
    videoViews: 3568406,
    profileViews: 1464991,
    subscribers: 17100,
    lastUpdate: new Date().toISOString()
};

// Salva valores corretos no localStorage
localStorage.setItem('instagram_stats', JSON.stringify(correctInstagramData));
localStorage.setItem('xvideos_stats', JSON.stringify(correctXVideosData));
localStorage.setItem('pornhub_stats', JSON.stringify(correctPornhubData));

// Força atualização imediata na UI
if (window.liveStats) {
    // Atualiza dados internos
    window.liveStats.instagramData = correctInstagramData;
    window.liveStats.xvideosData = correctXVideosData;
    window.liveStats.pornhubData = correctPornhubData;

    // Força atualização visual
    window.liveStats.updateUI();

    console.log('✅ Instagram Stats RESETADO com sucesso!');
    console.log('📊 Novos valores:', correctInstagramData);
} else {
    console.log('⚠️ Sistema de stats ainda não carregado. Recarregue a página!');
}

// Atualiza diretamente os elementos HTML como fallback
document.addEventListener('DOMContentLoaded', () => {
    // Instagram
    const igFollowers = document.getElementById('ig-followers');
    if (igFollowers) igFollowers.textContent = '92K';

    const igFollowing = document.getElementById('ig-following');
    if (igFollowing) igFollowing.textContent = '702';

    const igAvgLikes = document.getElementById('ig-avg-likes');
    if (igAvgLikes) igAvgLikes.textContent = '12.5K';

    const igEngagement = document.getElementById('ig-engagement');
    if (igEngagement) igEngagement.textContent = '14.5%';

    console.log('✅ Valores do Instagram corrigidos no HTML!');
});