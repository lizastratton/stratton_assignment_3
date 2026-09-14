var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]


var wordToGuessElement = document.getElementById('word-to-guess')
var previousWordElement = document.getElementById('previous-word')
var incorrectLettersElement = document.getElementById('incorrect-letters')
var remainingGuessesElement = document.getElementById('remaining-guesses')
var winsElement = document.getElementById('wins')
var lossesElement = document.getElementById('losses')


var currentWord
var guessedLetters
var incorrectLetters
var remainingGuesses
var wins = 0
var losses = 0

function startGame() {
  var randomIndex = Math.floor(Math.random() *  words.length);
  currentWord = words[randomIndex];
  guessedLetters = [];
  incorrectLetters = [];
  remainingGuesses = 10;
  incorrectLettersElement.textContent = '';
  remainingGuessesElement.textContent = remainingGuesses;
  wordToGuessElement.textContent = getWordDisplay();
}

function getWordDisplay() {
  var displayedWord = '';
  for (var i = 0; i < currentWord.length; i++) { 
    var letter = currentWord[i];
    if (guessedLetters.indexOf(letter) !== -1) {
      displayedWord += letter; }
      else {
      displayedWord += '_';
    }
  
  }
  return displayedWord;
}

document.addEventListener('keyup', function(event) {
  var key = event.key.toLowerCase();
  if (key.length !== 1 || key < 'a' || key > 'z') {
    return;
  }
  if (guessedLetters.indexOf(key) !== -1) {
    return;
  }
  guessedLetters.push(key);
  if (currentWord.indexOf(key) !== -1) {
    wordToGuessElement.textContent = getWordDisplay();
  }
  else {
    incorrectLetters.push(key);
    remainingGuesses--;
    incorrectLettersElement.textContent = incorrectLetters.join(', ');
    remainingGuessesElement.textContent = remainingGuesses;
  }
  if (wordToGuessElement.textContent === currentWord) {
    wins++;
    winsElement.textContent = wins;
    previousWordElement.textContent =  currentWord;
    startGame();
  }
  else if (remainingGuesses === 0) {
    losses++;
    lossesElement.textContent = losses;
    previousWordElement.textContent = currentWord;
    startGame();
  }

});


startGame();