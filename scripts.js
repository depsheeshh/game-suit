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

const pilih = document.querySelectorAll('li img');
pilih.forEach(function(pilih){
    pilih.addEventListener('click', function(){
        const comp = computerAi();
        const player = pilih.className;
        const hasil = getHasil(comp,player);

        memutar();

        setTimeout( function(){
            const info = document.querySelector('.info');
            const gambarComp = document.querySelector('.img-komputer');
            gambarComp.setAttribute('src', `img/${comp}.png`);
            info.innerHTML = hasil;
            }, 1000);
        
        // Membuat Score untuk Player dan Computer
        setTimeout( function(){
        const playerScore = document.querySelector('.score-player');
        const computerScore = document.querySelector('.score-computer');
        if (hasil === 'Menang'){
            playerScore.textContent = parseInt(playerScore.textContent) + 1;
        } else if( hasil === 'Kalah'){
            computerScore.textContent = parseInt(computerScore.textContent) + 1;
        }
    }, 1000)
    });
});