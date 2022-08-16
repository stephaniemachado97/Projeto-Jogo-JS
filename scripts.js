
const cards = document.querySelectorAll('.memory-card');

let matches = [];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch) {
    
    matches.push(firstCard.dataset.framework);

    if(matches.length === 6){
      
      // Função para aparecer o gif no fim do jogo, dando os parabéns.
      setTimeout(() => {
        Swal.fire({
          title: 'Você venceu!',
          width: 600,
          padding: '3em',
          color: '#716add',
          imageUrl: "imagens/homelander-based.gif",
          imageHeight: 300,
        })
      }, 1500);
    }
  }

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const btn = document.querySelector("#refresh")

btn.addEventListener('click', () => {
  location.reload()
})

