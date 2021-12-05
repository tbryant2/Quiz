//starting info and consts 
const startButton = document.getElementById('start-btn')
var timerEl = document.getElementById('countdown')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const resultsElement = document.getElementById('results')
const saveButton = document.getElementById('save')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const quizScoreSpan = document.getElementById('score')
const highScores = JSON.parse(localStorage.getItem("highscores")) || [] 
function displayMessage() {
}
var timeInterval; 
let testResults= 0; 

function showQuizScore() {
    quizScoreSpan.textContent=testResults
}

let shuffledQuestions,currectQuestionIndex;


startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currectQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    resultsElement.classList.add('hide')
    countdown()
    showQuizScore()
    testResults=0
    shuffledQuestions=questions.sort(() =>Math.random() -0.5)
    currectQuestionIndex=0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

//COUNTDOWN
var timeLeft = 30
// Timer that counts down from 30
function countdown() {
    console.log('hey now')
    //timerEl.textContent=timeLeft + ' seconds remaining';
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000)
}

  
function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currectQuestionIndex])
}


function showQuestion(question) {
    questionElement.innerText= question.question;
    question.answers.forEach((answer) => {
        const button= document.createElement('button')
        button.innerText= answer.text; 
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct =answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}


function resetState() {
    clearStatusClass(document.body) 
    nextButton.classList.add('hide')
    let testResults= 0; 
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
}


function selectAnswer(e){
    const selectedButton=e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    // Array.from(answerButtonsElement.children).forEach((button) =>{
    //     setStatusClass(button,button.dataset.correct)
    // })
    if(shuffledQuestions.length > currectQuestionIndex +1){
        nextButton.classList.remove("hide")
    } else {
        endGame()
    }
//     if(selectedButton.dataset = correct) {
//         quizScore++
//     }
//     document.getElementById('right-answers').innerText=quizScore
}


function setStatusClass(element,correct) {
    console.log(typeof correct)
    clearStatusClass(element)
    if(correct == 'true') {
        console.log('hey')
        element.classList.add("correct")
        testResults++
        showQuizScore()
    } else {
        element.classList.add("wrong")
        timeLeft=timeLeft - 2
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame() {
    clearInterval(timeInterval);
    //timeLeft = 60
    questionContainerElement.classList.add('hide')
    resultsElement.classList.remove('hide')
}

saveButton.addEventListener('click', function(){
    var initials = document.getElementById('initials').value
    var score = {initials:initials,score:timeLeft}
    highScores.push(score)
    localStorage.setItem("highscores", JSON.stringify(highScores));
    timeLeft=60
    startButton.innerText = "restart"
    startButton.classList.remove("hide")
})

// questions and answers 
const questions =[ 
    {
        question: 'Which one of these is a Javascript framework?',
        answers:[
            { text: 'Python', correct: false},
            { text: 'Django', correct: false},
            { text: 'React', correct: true},
            { text: 'Eclipse', correct: false},
        ], 
    },
    {
        question: 'Which language styleizes the webpage?',
        answers:[
            { text: 'CSS', correct: true},
            { text: 'HTML', correct: false},
            { text: 'Python', correct: false},
            { text: 'MaxForLive', correct: false},
        ], 
    },
    {
        question: 'How does one reference an ID on a CSS page?',
        answers:[
            { text: 'quotations', correct: false},
            { text: 'hyphen', correct: false},
            { text: 'hashtag', correct: false},
            { text: 'perdiod notation', correct: true},
        ], 
    },
    {
        question: 'Which data type represents a true or false answer?',
        answers:[
            { text: 'numerical', correct: false},
            { text: 'boolean', correct: true},
            { text: 'string', correct: false},
            { text: 'matrix', correct: false},
        ], 
    },
]; 