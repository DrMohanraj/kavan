/* ==================================
KAVAN GAME ENGINE
script.js - Part 1
================================== */

let currentQuestion = 0;
let score = 0;
let honey = 0;
let level = 1;

/* DOM */

const splashScreen =
document.getElementById("splash-screen");

const gameContainer =
document.getElementById("game-container");

const startBtn =
document.getElementById("start-game-btn");

const nextBtn =
document.getElementById("next-btn");

const scoreEl =
document.getElementById("score");

const honeyEl =
document.getElementById("honey");

const levelEl =
document.getElementById("level");

const questionNumberEl =
document.getElementById("question-number");

const questionTextEl =
document.getElementById("question-text");

const optionsContainer =
document.getElementById("options-container");

const feedbackMessage =
document.getElementById("feedback-message");

const target =
document.getElementById("target");

const stone =
document.getElementById("stone");

/* =====================
START GAME
===================== */

startBtn.addEventListener(
"click",
startGame
);

function startGame(){

splashScreen.classList.add("hidden");

gameContainer.classList.remove("hidden");

loadQuestion();

}

/* =====================
LOAD QUESTION
===================== */

function loadQuestion(){

feedbackMessage.innerHTML = "";

nextBtn.style.display = "none";

stone.classList.remove("launch");

const q =
questions[currentQuestion];

questionNumberEl.innerHTML =
`கேள்வி ${currentQuestion+1}
 / ${questions.length}`;

questionTextEl.innerHTML =
q.question;

optionsContainer.innerHTML = "";

q.options.forEach(
(option,index)=>{

const btn =
document.createElement("button");

btn.classList.add(
"option-btn"
);

btn.innerText = option;

btn.addEventListener(
"click",
()=>{
selectAnswer(index);
}
);

optionsContainer.appendChild(btn);

}
);

}

/* =====================
SELECT ANSWER
===================== */

function selectAnswer(selectedIndex){

const q =
questions[currentQuestion];

const buttons =
document.querySelectorAll(
".option-btn"
);

buttons.forEach(btn=>{
btn.disabled=true;
});

if(
selectedIndex === q.answer
){

correctAnswer(buttons);

}
else{

wrongAnswer(
buttons,
selectedIndex,
q.answer
);

}

}

/* =====================
CORRECT
===================== */

function correctAnswer(buttons){

buttons.forEach(
(btn,index)=>{

if(
index ===
questions[currentQuestion]
.answer
){
btn.classList.add(
"correct"
);
}

}
);

launchStone();

setTimeout(()=>{

score += 10;
honey += 5;

updateHUD();

feedbackMessage.innerHTML =
"🎯 சரியான பதில்! +10 புகழ் +5 தேன்";

nextBtn.style.display =
"inline-block";

},1000);

}

/* =====================
WRONG
===================== */

function wrongAnswer(
buttons,
selected,
correct
){

buttons[selected]
.classList.add("wrong");

buttons[correct]
.classList.add("correct");

feedbackMessage.innerHTML =
"❌ தவறான பதில்";

nextBtn.style.display =
"inline-block";

}

/* =====================
SLING ANIMATION
===================== */

function launchStone(){

stone.classList.add(
"launch"
);

setTimeout(()=>{

target.classList.add(
"hit"
);

},700);

setTimeout(()=>{

target.classList.remove(
"hit"
);

},1200);

}

/* =====================
HUD
===================== */

function updateHUD(){

scoreEl.innerHTML =
score;

honeyEl.innerHTML =
honey;

level =
Math.floor(
currentQuestion / 5
) + 1;

levelEl.innerHTML =
level;

}

/* =====================
NEXT QUESTION
===================== */

nextBtn.addEventListener(
"click",
nextQuestion
);

function nextQuestion(){

currentQuestion++;

if(
currentQuestion >=
questions.length
){

endGame();

return;

}

loadQuestion();

}

/* =====================
END GAME
===================== */

function endGame(){

gameContainer.innerHTML =

`

<div style="
padding:40px;
text-align:center;
">

<h1>
👑 மலைமகன்
</h1>

<h2>
வாழ்த்துகள்!
</h2>

<p>
நீங்கள் அனைத்து
கேள்விகளையும்
முடித்துவிட்டீர்கள்.
</p>

<br>

<h3>
🏆 புகழ் : ${score}
</h3>

<h3>
🍯 தேன் : ${honey}
</h3>

<br>

<button
onclick="location.reload()"
style="
padding:15px 25px;
font-size:18px;
background:#FFC107;
border:none;
border-radius:12px;
cursor:pointer;
">
மீண்டும் விளையாடு </button>

</div>
`;

}

/* =====================
INITIAL HUD
===================== */

updateHUD();
