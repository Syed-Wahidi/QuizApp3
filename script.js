
const STORE = [
	{
		question: 'Which sport has 5 players playing from one team?',
		answers: [
			'Soccer',
			'Rugby',
			'Football',    
			'Basketball'],
		correctAnswer: 'Basketball'
	},
	{
		question: 'Which sport did Joe Montana play?',
		answers: [
			'Basketball',
			'Football',
			'Soccer',
			'Hockey'
			],
		correctAnswer: 'Football'
	},
	{
		question: 'Which Sport do players play with a puck?',
		answers: [
			'Basketball',
			'Football',
			'Soccer',
			'Hockey'
			],
		correctAnswer: 'Hockey'
	},
	{
		question: 'What sport did David Beckham play?',
		answers: [
			'Basketball',
			'Football',
			'Soccer',
			'Hockey'
			],
		correctAnswer: 'Soccer'
	},
	{
		question: 'How tall is the Basketball hoop?',
		answers: [
			'5 feet',
			'8 feet',
			'10 feet',
			'11 feet'
			],
		correctAnswer: '10 feet'
	}
]
let count = 0;
let spanCount = 0;
let score = 0;

// start Intro
function renderIntro() {
  $(".js-intro").show();
  $(".js-question").hide();
  $(".js-feedback").hide();
  $(".js-evaluation").hide();
}

//  start quiz by clicking button
function renderQuestion() {
  $(".js-intro-submit").on("click", event => {
    event.preventDefault();
    renderQuestionForm();
  });
}

//  spanCount increments
function increaseSpanCount() {
  spanCount++;
  $(".js-question-counter").text(spanCount);
}
// increases store question index for render ?'s
function increaseStoreCount() {
  count++;
}

// question form
function renderQuestionForm() {
  increaseSpanCount();
  showOnlyQuestionDiv();
  $(".js-question").html(`
    <form id='form'>
    <fieldset>
    <legend><h2>${STORE[count].question}</h2></legend>
    <div class='css-answers'>
		<input id='answer1' type="radio" name='answer' value='${STORE[count].answers[0]}' required>
		<label for='answer1'>${STORE[count].answers[0]}</label>
    </div>
    <div class='css-answers'>
    <input id='answer2' type="radio" name='answer' value='${STORE[count].answers[1]}' required>
		<label for='answer2'>${STORE[count].answers[1]}</label>
    </div>
    <div class='css-answers'>
    <input id='answer3' type="radio" name='answer' value='${STORE[count].answers[2]}' required>
		<label for='answer3'>${STORE[count].answers[2]}</label>
    </div>
    <div class='css-answers'>
    <input id='answer4' type="radio" name='answer' value='${STORE[count].answers[3]}' required>
		<label for='answer4'>${STORE[count].answers[3]}</label>
    </div>
    </fieldset>
    <div class="controls">
    <button class='button js-question-submit'>Submit</button>
    </div>
    </form>`);
}

// show question form
function showOnlyQuestionDiv() {
  $(".js-intro").hide();
  $(".js-feedback").hide();
  $(".js-question").show();
}

// check answer matches store answer
function checkAnswer(answer) {
  return answer === `${STORE[count].correctAnswer}`;
}

// feedback render


// feedback render
function renderFeedbackRight() {
  $(".js-question").hide();
         $(".js-feedback")
                .show()
                .html(`<h2>Correct!</h2>
                <p>Go to the next problem!</p>
                <div class="controls">
                <button class='button js-feedback-submit'>Next</button>
                </div>`);
                          
  increaseStoreCount();
  increaseScoreCount();
}
function renderFeedbackWrong()
{
   $(".js-question").hide();
         $(".js-feedback")
                .show()
                .html(`<h2>Incorrect</h2>
                <p>The correct answer is: '${STORE[count].correctAnswer}'</p>
                <div class="controls">
                <button class='button js-feedback-submit'>Next</button>
                </div>`);
             increaseStoreCount(); 
               
}


// check answer render the feedback
function submitQuestion() {
  $(".js-question").on("submit", event => {
    event.preventDefault();
    const value = getRadioValue(event);
    const answerIsCorrect = checkAnswer(value);
    if (answerIsCorrect ===true)
      {   
        renderFeedbackRight();
      }
     else   
          {
            renderFeedbackWrong();
          }
  });
}

// get radio value
function getRadioValue(event) {
  let checkedRadioButton = $(event.currentTarget)
    .find("input:checked")
    .val();
  return checkedRadioButton;
}





// increases score for right answer
function increaseScoreCount() {
  score += 10;
  updateDomScore(count);
}

// updates score
function updateDomScore(count) {
  $(".js-score-counter").text(score);
}





// calls eval function
function submitFeedback() {
  $(".js-feedback").on("click", ".js-feedback-submit", () => {
    ifMaxQuestionIsReached();
  });
}

// check if last question is answered
function ifMaxQuestionIsReached() {
  if (count == 5) {
    showEval();
    renderScore();
  } else {
    renderQuestionForm();
  }
}

// show eval 
function showEval() {
  $(".js-feedback").hide();
  $(".js-evaluation").show();
}

// renders eval 
function renderScore() {
  $(".js-evaluation").html(`
  <h2>You completed the quiz!</h2>
  <h3>Your score comes out to be ${score}.</h3>
  <h3>You got ${score/10} out of 5 correct.</h3>
  <div class="controls">
  <button class='button js-button-reload'>Play again</button>
  </div>
  `);
}

// reload the quiz
function reload() {
  $(".js-evaluation").on("click", ".js-button-reload", () => {
    resetAll();
    renderIntro();
  });
}

//counters set to 0
function resetAll() {
  count = 0;
  spanCount = 0;
  score = 0;
  $(".js-question-counter").text(0);
  $(".js-score-counter").text(0);
}

function quizStart() {
  renderIntro();
  renderQuestion();
  submitQuestion();
  submitFeedback();
  reload();
}

$(quizStart);
