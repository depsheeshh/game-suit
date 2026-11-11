// ============================================================
//  GAME SUIT v3.0 - PREMIUM DARK EDITION
//  Semua kode komentar lama DIPERTAHANKAN sebagai kenang-kenangan
// ============================================================

// --- KODE LAMA (Kenang-kenangan v1 & v2) ---

function computerAi(){
    const comp = Math.random();

    if (comp < 0.36) return 'gunting';
    if (comp >= 0.36 && comp < 0.66) return 'kertas';
    return 'batu';
    
}

function getHasil(comp,p){
    if (p == comp) return 'Seri'
    if (p == 'gunting') return (comp == 'kertas') ? 'Menang':'Kalah';
    if (p == 'kertas') return (comp == 'batu') ? 'Menang':'Kalah';
    if (p == 'batu') return (comp == 'gunting') ? 'Menang':'Kalah';
}

function memutar(){
    const compImg = document.querySelector('.img-komputer');
    const img = ['batu','kertas','gunting'];
    let j = 0;
    const waktuMulai = new Date().getTime();
    setInterval(() => {
        if(new Date().getTime() - waktuMulai > 1000){
            clearInterval;
            return;
        }
        compImg.src = `img/${img[j++]}.png`
        if( j == img.length ) j = 0;
    }, 100);
}

// const batu = document.querySelector('.batu');
// batu.addEventListener('click', function(){
//     const comp = computerAi();
//     const player = batu.className;
//     const hasil = getHasil(comp,player);
//     const info = document.querySelector('.info');
//     const gambarComp = document.querySelector('.img-komputer');
//     gambarComp.setAttribute('src', `img/${comp}.png`);
//     info.innerHTML = hasil;
// })

// const kertas = document.querySelector('.kertas');
// kertas.addEventListener('click', function(){
//     const comp = computerAi();
//     const player = kertas.className;
//     const hasil = getHasil(comp,player);
//     const info = document.querySelector('.info');
//     const gambarComp = document.querySelector('.img-komputer');
//     gambarComp.setAttribute('src', `img/${comp}.png`);
//     info.innerHTML = hasil;
// })

// const gunting = document.querySelector('.gunting');
// gunting.addEventListener('click', function(){
//     const comp = computerAi();
//     const player = gunting.className;
//     const hasil = getHasil(comp,player);
//     const info = document.querySelector('.info');
//     const gambarComp = document.querySelector('.img-komputer');
//     gambarComp.setAttribute('src', `img/${comp}.png`);
//     info.innerHTML = hasil;
// })

// CODE PALING EFEKTIF DARI TIGA CODE DIATAS

// const pilih = document.querySelectorAll('li img');
// pilih.forEach(function(pilih){
//     pilih.addEventListener('click', function(){
//         const comp = computerAi();
//         const player = pilih.className;
//         const hasil = getHasil(comp,player);
//
//         memutar();
//
//         setTimeout( function(){
//             const info = document.querySelector('.info');
//             const gambarComp = document.querySelector('.img-komputer');
//             gambarComp.setAttribute('src', `img/${comp}.png`);
//             info.innerHTML = hasil;
//             }, 1000);
//         
//         // Membuat Score untuk Player dan Computer
//         setTimeout( function(){
//         const playerScore = document.querySelector('.score-player');
//         const computerScore = document.querySelector('.score-computer');
//         if (hasil === 'Menang'){
//             playerScore.textContent = parseInt(playerScore.textContent) + 1;
//         } else if( hasil === 'Kalah'){
//             computerScore.textContent = parseInt(computerScore.textContent) + 1;
//         }
//     }, 1000)
//     });
// });

// ============================================================
//  KODE BARU v3.0 - Semua fitur modern di bawah ini
// ============================================================

// --- State Game ---
let scorePlayer   = 0;
let scoreComputer = 0;
let roundCount    = 0;
let streakPlayer  = 0;
let streakComp    = 0;
let isAnimating   = false;
const WIN_SCORE   = 10; // Kemenangan di ronde ke berapa modal muncul

// --- DOM Elements ---
const imgKomputer    = document.getElementById('img-komputer');
const imgPlayer      = document.getElementById('img-player');
const battleInfoText = document.getElementById('battle-info-text');
const battleInfoIcon = document.getElementById('battle-info-icon');
const scorePlayerEl  = document.getElementById('score-player');
const scoreCompEl    = document.getElementById('score-computer');
const roundEl        = document.getElementById('round-counter');
const streakPlayerEl = document.getElementById('streak-player');
const streakCompEl   = document.getElementById('streak-computer');
const choiceGlowComp = document.querySelector('.choice-glow--computer');
const choiceGlowPlay = document.querySelector('.choice-glow--player');
const arenaComp      = document.getElementById('arena-computer');
const arenaPlayer    = document.getElementById('arena-player');
const scoreCardPlay  = document.getElementById('score-card-player');
const scoreCardComp  = document.getElementById('score-card-computer');
const toastEl        = document.getElementById('toast');
const resultModal    = document.getElementById('result-modal');
const modalBackdrop  = document.getElementById('modal-backdrop');
const resultTrophy   = document.getElementById('result-trophy');
const resultTitle    = document.getElementById('result-title');
const resultDesc     = document.getElementById('result-desc');
const btnPlayAgain   = document.getElementById('modal-play-again');
const btnModalClose  = document.getElementById('modal-close');
const resetBtn       = document.getElementById('reset-btn');
const choiceBtns     = document.querySelectorAll('.choice-btn');

// --- Particle System ---
(function initParticles() {
    const container = document.getElementById('particles');
    const COLORS = [
        'hsla(210,100%,70%,0.6)',
        'hsla(190,100%,60%,0.5)',
        'hsla(260,80%,70%,0.5)',
        'hsla(340,90%,65%,0.5)',
        'hsla(45,100%,65%,0.5)',
    ];
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size    = Math.random() * 5 + 2;
        const left    = Math.random() * 100;
        const delay   = Math.random() * 12;
        const duration= Math.random() * 10 + 8;
        const color   = COLORS[Math.floor(Math.random() * COLORS.length)];
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${left}%;
            animation-delay:${delay}s;
            animation-duration:${duration}s;
            background:${color};
            box-shadow: 0 0 ${size*3}px ${color};
        `;
        container.appendChild(p);
    }
})();

// --- Animasi Spinning Komputer (versi baru dengan class CSS) ---
function memutarV3(callback) {
    const imgs   = ['batu', 'kertas', 'gunting'];
    let idx      = 0;
    const start  = Date.now();
    imgKomputer.classList.add('spinning');
    const interval = setInterval(() => {
        imgKomputer.src = `img/${imgs[idx++ % imgs.length]}.png`;
        if (Date.now() - start > 900) {
            clearInterval(interval);
            imgKomputer.classList.remove('spinning');
            if (callback) callback();
        }
    }, 100);
}

// --- Toast Notification ---
let toastTimer = null;
function showToast(msg, type = '') {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.className   = 'toast show' + (type ? ` toast--${type}` : '');
    toastTimer = setTimeout(() => {
        toastEl.classList.remove('show');
    }, 2500);
}

// --- Animasi Score Bump ---
function bumpScore(el, cardEl) {
    el.classList.remove('score-bump');
    cardEl.classList.remove('score-pop');
    void el.offsetWidth; // reflow untuk trigger ulang
    el.classList.add('score-bump');
    cardEl.classList.add('score-pop');
    setTimeout(() => { el.classList.remove('score-bump'); cardEl.classList.remove('score-pop'); }, 500);
}

// --- Update Streak Label ---
function updateStreak() {
    if (streakPlayer >= 2) {
        streakPlayerEl.textContent = `🔥 ${streakPlayer}x Streak!`;
    } else {
        streakPlayerEl.textContent = '';
    }
    if (streakComp >= 2) {
        streakCompEl.textContent = `🔥 ${streakComp}x Streak!`;
    } else {
        streakCompEl.textContent = '';
    }
}

// --- Tampilkan Modal Hasil ---
function showModal(isPlayerWin) {
    if (isPlayerWin) {
        resultTrophy.textContent  = '🏆';
        resultTitle.textContent   = 'Kamu Menang!';
        resultTitle.classList.remove('lose-title');
        resultDesc.textContent    = `Luar biasa! Kamu mengalahkan komputer ${WIN_SCORE} kali. Kamu juaranya!`;
    } else {
        resultTrophy.textContent  = '😢';
        resultTitle.textContent   = 'Komputer Menang!';
        resultTitle.classList.add('lose-title');
        resultDesc.textContent    = `Komputer mengalahkan kamu ${WIN_SCORE} kali. Coba lagi dan buktikan kehebatanmu!`;
    }
    resultModal.classList.add('show');
    modalBackdrop.classList.add('show');
}

function hideModal() {
    resultModal.classList.remove('show');
    modalBackdrop.classList.remove('show');
}

// --- Reset Game ---
function resetGame() {
    scorePlayer   = 0;
    scoreComputer = 0;
    roundCount    = 0;
    streakPlayer  = 0;
    streakComp    = 0;
    isAnimating   = false;

    scorePlayerEl.textContent = '0';
    scoreCompEl.textContent   = '0';
    roundEl.textContent       = '0';
    streakPlayerEl.textContent = '';
    streakCompEl.textContent   = '';

    imgKomputer.src = 'img/batu.png';
    imgKomputer.style.opacity = '';
    imgKomputer.style.filter  = '';

    imgPlayer.src   = 'img/batu.png';
    imgPlayer.style.opacity = '0.3';
    imgPlayer.style.filter  = 'grayscale(1)';

    battleInfoText.textContent  = 'Pilih senjatamu!';
    battleInfoText.className    = 'battle-info-text';
    battleInfoIcon.textContent  = '⚔️';

    arenaComp.classList.remove('winner', 'loser');
    arenaPlayer.classList.remove('winner', 'loser');
    scoreCardPlay.classList.remove('is-winning');
    scoreCardComp.classList.remove('is-winning');
    choiceGlowComp.classList.remove('active');
    choiceGlowPlay.classList.remove('active');

    choiceBtns.forEach(btn => btn.classList.remove('selected'));
    choiceBtns.forEach(btn => btn.disabled = false);

    hideModal();
    showToast('🔄 Game direset! Ayo mulai lagi!', '');
}

// --- Main Game Logic ---
choiceBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;

        const playerChoice = btn.dataset.choice;
        const compChoice   = computerAi();
        const hasil        = getHasil(compChoice, playerChoice);

        // Tandai pilihan yang dipilih
        choiceBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Tampilkan gambar player langsung
        imgPlayer.src           = `img/${playerChoice}.png`;
        imgPlayer.style.opacity = '1';
        imgPlayer.style.filter  = '';
        imgPlayer.classList.remove('animate-reveal');
        void imgPlayer.offsetWidth;
        imgPlayer.classList.add('animate-reveal');

        // Reset arena state
        arenaComp.classList.remove('winner', 'loser');
        arenaPlayer.classList.remove('winner', 'loser');
        choiceGlowComp.classList.remove('active');
        choiceGlowPlay.classList.remove('active');

        // Animasi komputer berpikir lalu tampilkan hasilnya
        memutarV3(() => {
            imgKomputer.src = `img/${compChoice}.png`;
            imgKomputer.classList.remove('animate-reveal');
            void imgKomputer.offsetWidth;
            imgKomputer.classList.add('animate-reveal');

            roundCount++;
            roundEl.textContent = roundCount;

            // Update state dan UI berdasarkan hasil
            if (hasil === 'Menang') {
                scorePlayer++;
                streakPlayer++;
                streakComp = 0;
                scorePlayerEl.textContent = scorePlayer;
                bumpScore(scorePlayerEl, scoreCardPlay);
                scoreCardPlay.classList.add('is-winning');
                scoreCardComp.classList.remove('is-winning');
                arenaPlayer.classList.add('winner');
                arenaComp.classList.add('loser');
                choiceGlowPlay.classList.add('active');
                battleInfoText.textContent = '🎉 Menang!';
                battleInfoText.className   = 'battle-info-text menang';
                battleInfoIcon.textContent = '✅';
                showToast('🎉 Yeay! Kamu menang ronde ini!', 'win');

            } else if (hasil === 'Kalah') {
                scoreComputer++;
                streakComp++;
                streakPlayer = 0;
                scoreCompEl.textContent = scoreComputer;
                bumpScore(scoreCompEl, scoreCardComp);
                scoreCardComp.classList.add('is-winning');
                scoreCardPlay.classList.remove('is-winning');
                arenaComp.classList.add('winner');
                arenaPlayer.classList.add('loser');
                choiceGlowComp.classList.add('active');
                battleInfoText.textContent = '😤 Kalah!';
                battleInfoText.className   = 'battle-info-text kalah';
                battleInfoIcon.textContent = '❌';
                showToast('😤 Komputer menang ronde ini. Jangan menyerah!', 'lose');

            } else {
                // Seri
                streakPlayer = 0;
                streakComp   = 0;
                battleInfoText.textContent = '🤝 Seri!';
                battleInfoText.className   = 'battle-info-text seri';
                battleInfoIcon.textContent = '🤝';
                showToast('🤝 Seri! Coba lagi!', 'draw');
            }

            updateStreak();

            // Cek apakah ada pemenang keseluruhan
            if (scorePlayer >= WIN_SCORE || scoreComputer >= WIN_SCORE) {
                setTimeout(() => {
                    showModal(scorePlayer >= WIN_SCORE);
                }, 700);
            }

            setTimeout(() => { isAnimating = false; }, 400);
        });
    });
});

// --- Event: Modal Tombol ---
btnPlayAgain.addEventListener('click', resetGame);
btnModalClose.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);
resetBtn.addEventListener('click', resetGame);