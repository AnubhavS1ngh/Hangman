const wordEl = document.getElementById("word");

const wrongLettersEl = document.getElementById("wrong-letters");

const playAgain = document.getElementById("play-button");

const popup = document.getElementById("popup-container");

const notification = document.getElementById("notification-container");

const finalMessage = document.getElementById("final-message") ;

const figureParts = document.querySelectorAll(".figure-part") ;

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
];

let selectedWord = words[Math.floor(Math.random()* words.length)];
const correctLetters = ["a"];
const wrongLetters = [];



function displayWord() {  wordEl.innerHTML = `${selectedWord
  .split("")
  .map(
    (letter) =>
      `<span class="letter">${correctLetters.includes(letter) ? letter : "&nbsp;"}</span>`
  )
  .join("")}`;

const innerWord = wordEl.innerText.replace(/\n/g, "");

if (innerWord === selectedWord) {
  finalMessage.innerText = "Congratulations! You Won!";
  popup.style.display = "flex";

    }
}

//wrong letter function
function updateWrongLettersEl(){
  wrongLettersEl.innerHTML = 
  `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
   ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `}

  function updateBodyParts() {
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
}
  //display body parts
  figureParts.forEach((part,index) => {
    const errors = wrongLetters.length;
    if(index < errors){
      part.style.display = "block"; 
    }else{
      part.style.display = "none";
    }
  });

  //check if you lost the game
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText = "Unfortunately You Lost!";
    popup.style.display="flex";
  }

  //show notification
  // function showNotification(){
  //   notification.classList.add("show");
  //   setTimeout(() => {
  //     notification.classList.remove("show");
  //   },2000);
  // }
  function showNotification(message) {
    notification.querySelector("p").innerText = message;
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
  

  // KeyDown letter press

// window.addEventListener("keydown",(e) => {
//   if(e.keyCode >= 65 && e.keyCode <= 90){
//     const letter = e.key;
//     if(selectedWord.includes(letter)){
//       if(!correctLetters.includes(letter)){
//         correctLetters.push(letter);
//         displayWord();
//       }
//       else{
//         showNotification();
//       }
//     }
//     else{
//       if(!wrongLetters.includes(letter)){
//         wrongLetters.push(letter);
//         updateWrongLettersEl();
//         updateBodyParts();
//       }
//       else{
//         showNotification();
//       }
//     }
//   }
// });
function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters.length = 0;
  wrongLetters.length = 0;
  updateWrongLettersEl();
  updateBodyParts();
  displayWord();
  popup.style.display = "none";
}
playAgain.addEventListener("click", resetGame);

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification("You have already entered this letter");
      }
    } else {
      if (!wrongLetters.includes(letter) && !correctLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
        updateBodyParts();

        if (wrongLetters.length === figureParts.length) {
          finalMessage.innerText = "Unfortunately, You Lost!";
          popup.style.display = "flex";
          showNotification("You lost the game!");
        }
      } else {
        showNotification("You have already entered this letter");
      }
    }
  }
});

resetGame();

displayWord();