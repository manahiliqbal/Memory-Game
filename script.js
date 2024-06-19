const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const controls = document.querySelector(".controls-container"); 
const result = document.getElementById("result"); 

let seconds = 0, minutes = 0;
let interval;
let movesCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");

  interval = setInterval(timeGenerator, 500);

  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  initializer();
});

stopButton.addEventListener(
    "click",
    (stopGame = () => {
      controls.classList.remove("hide");
      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
    })
  );

const cards = document.querySelectorAll(".card");
let card1, card2;
let disabled = false;
let matchedCards = 0;

function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== card1 && !disabled) {
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    movesCounter();
    card2 = clickedCard;
    disabled = true;
    let card1img = card1.querySelector("img").src;
    let card2img = card2.querySelector("img").src;
    matchCards(card1img, card2img);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCards++;
    if (matchedCards === 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
      result.innerHTML = `<h2>You Won</h2>
      <h4>Moves: ${movesCount}</h4>`;
      stopGame();
    }
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    card1 = card2 = "";
    return (disabled = false);
  }
  setTimeout(() => {
    card1.classList.add("shake");
    card2.classList.add("shake");
  }, 400);
  setTimeout(() => {
    card1.classList.remove("shake", "flip");
    card2.classList.remove("shake", "flip");
    card1 = card2 = "";
    disabled = false;
  }, 1200);
}

function shuffleCard() {
  card1 = card2 = "";
  matchedCards = 0;
  disabled = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

const initializer = () => {
  result.innerText = "";
  shuffleCard();
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
};

