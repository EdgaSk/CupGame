let animals = {
    monkey: "assets/monkey.gif",
    catHypno: "assets/cathypno.gif",
    banana: "assets/banana.gif",
    bunny: "assets/bunny.gif",
    cat: "assets/cat.gif",
    chicken: "assets/chicken.gif",
    dog: "assets/dog.gif",
    panda: "assets/panda.gif",
    pig: "assets/pig.gif",
};
  
let animalsImgBox = {
    img1: document.querySelector("#img1"),
    img2: document.querySelector("#img2"),
    img3: document.querySelector("#img3"),
    img4: document.querySelector("#img4"),
    img5: document.querySelector("#img5"),
    img6: document.querySelector("#img6"),
    img7: document.querySelector("#img7"),
    img8: document.querySelector("#img8"),
    img9: document.querySelector("#img9"),
};
  
let heart = "assets/lives.png";
let livesBox = {
    lives1: document.querySelector("#lives1"),
    lives2: document.querySelector("#lives2"),
    lives3: document.querySelector("#lives3"),
    lives4: document.querySelector("#lives4"),
    lives5: document.querySelector("#lives5"),
    lives6: document.querySelector("#lives6"),
    lives7: document.querySelector("#lives7"),
    lives8: document.querySelector("#lives8"),
    lives9: document.querySelector("#lives9"),
    lives10: document.querySelector("#lives10"),
    lives11: document.querySelector("#lives11"),
    lives12: document.querySelector("#lives12"),
    lives13: document.querySelector("#lives13"),
    lives14: document.querySelector("#lives14"),
    lives15: document.querySelector("#lives15"),
};
  
let buyButton = document.querySelector("#buyLives");
buyButton.addEventListener("click", function() {
    buyLives();
});


let bunnyCount = document.querySelector("#cachedBunny");

let lives = 15;
let caughtBunnies = 0;
let isGameOver = false;

startGame();
  
  // Funkcija pradeda žaidimą
function startGame() {
    resetGame();
  
    let animalKeys = Object.keys(animals);
    shuffleArray(animalKeys);
  
    for (let i = 0; i < animalKeys.length; i++) {
      let imgKey = `img${i + 1}`;
      let animalKey = animalKeys[i];
      animalsImgBox[imgKey].src = animals[animalKey];
    }
  
    let cups = document.querySelectorAll(".plasticCup");
    cups.forEach((cup) => {
      cup.addEventListener("click", handleCupClick);
    });
}
  
  // Funkcija, kuri tvarko puodelių paspaudimus
function handleCupClick() {
    if (isGameOver) {
      return;
    }
  
    let cup = this;
    cup.style.display = "none";
  
    let animalImg = cup.parentNode.querySelector("img.animalsGif");
    if (animalImg.src.includes(animals.bunny)) {
      caughtBunnies++;
      bunnyCount.textContent = caughtBunnies;
  
      if (caughtBunnies >= 10) {
        endGame(true);
      } else {
        hideCups();
        setTimeout(function () {
          alert("You found a bunny! Click 'OK' to mix the animals.");
          mixAnimals();
          showCups();
        }, 1000);
      }
    } else {
      lives--;
      if (lives <= 0) {
        endGame(false);
      } else {
        livesBox[`lives${lives + 1}`].src = ""; // Atnaujinti sirdelės atvaizdą
      }
    }
}
  
// Funkcija, kuri užbaigia žaidimą
function endGame(isWin) {
    isGameOver = true;
  
    let cups = document.querySelectorAll(".plasticCup");
    cups.forEach((cup) => {
      cup.removeEventListener("click", handleCupClick);
      cup.style.display = "block";
    });
  
    if (isWin) {
      alert("Congratulations! You won the game!");
    } else {
      alert("Game over! You lost all your lives!");
    }
  
    buyButton.disabled = true;
    resetGame(); // Išvalyti žaidimo būseną
  
    // Paleisti naują ciklą po 1 sekundžių
    setTimeout(startGame, 1000);
}
  
// Funkcija, kuri paslepia puodelius
function hideCups() {
    let cups = document.querySelectorAll(".plasticCup");
    cups.forEach((cup) => {
      cup.style.display = "none";
    });
}
  
// Funkcija, kuri rodo puodelius
function showCups() {
    let cups = document.querySelectorAll(".plasticCup");
    cups.forEach((cup) => {
      cup.style.display = "block";
    });
}
  
// Funkcija, kuri permaišo masyvo elementus
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}
  
// Funkcija, kuri nustato pradines žaidimo reikšmes
function resetGame() {
    lives = 15;
    caughtBunnies = 0;
    isGameOver = false;
  
    bunnyCount.textContent = caughtBunnies;
  
    for (let key in livesBox) {
      livesBox[key].src = heart;
    }
  
    buyButton.disabled = false;
}
  
// Funkcija, kuri leidžia nusipirkti gyvybes
    function buyLives() {
    if (lives >= 15) {
      alert("You can't buy more lives. Maximum reached!");
      return;
    }
  
    if (caughtBunnies <= 0) {
      alert("You don't have any caught bunnies to exchange for lives!");
      return;
    }
  
    caughtBunnies--;
    bunnyCount.textContent = caughtBunnies;
    lives++;
  
    livesBox[`lives${lives}`].src = heart;
}
  
// Funkcija, kuri išmaišo gyvūnų masyvą ir pradeda naują žaidimą
function mixAnimals() {
    let animalKeys = Object.keys(animals);
    shuffleArray(animalKeys);
  
    for (let i = 0; i < animalKeys.length; i++) {
      let imgKey = `img${i + 1}`;
      let animalKey = animalKeys[i];
      animalsImgBox[imgKey].src = animals[animalKey];
    }
}
  

