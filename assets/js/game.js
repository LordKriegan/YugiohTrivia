var currQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var answerTime = 0;
const const_answerTime = 45;
var gameTimer;

function loadQuestion(x) {
    //if x greater than or equal to questions.length, end game
    if (x >= questions.length) {
        endGame();
        return;
    }
    $("#question").html((x + 1) + ". " + questions[x].question);
    $("#answersBox").empty();
    for (var i = 0; i < questions[x].answers.length; i++) {
        var newPar = $("<p>");
        newPar.addClass("answer");
        newPar.html(questions[x].answers[i].ans);
        newPar.attr("data-index", i);
        $("#answersBox").append(newPar);
    }
    $("#timer").html(timeConverter(const_answerTime));
    startTimer();
}

function endGame() {
	clearInterval(gameTimer);
    $("#question").html("Final Score:");
    $("#answersBox").empty();
    $("#answersBox").append("<div class='correctAnswer'></div>");
    $(".correctAnswer").append("<p>Correct: " + correctAnswers +
        "</p><p>Incorrect: " + wrongAnswers +
        "</p><p>Unanswered: " + unAnswered + "<p>");
    var timeOut = setTimeout(function() {
    	currQuestion = 0;
    	correctAnswer = 0;
    	wrongAnswers = 0;
    	unAnswered = 0;
    	$("#answersBox").empty();
        $("#answersBox").append("<p class='answer' id='startBtn'>Start</p");
    }, 5000);
}

function showAnswer(num) {
	clearInterval(gameTimer);
	$("#answersBox").empty();
	//declared i out here to emulate block level scoping cus JS is wierd and this makes more sense :/
	var i = 0;
	for (; i < questions[currQuestion].answers.length; i++) {
		if (questions[currQuestion].answers[i].isCorrect) {
			break;
		}
	}

	switch (num) {
		case 1:
			$("#answersBox").append("<p class='correctAnswer'>Thats right!</p>");
			break;
		case 2:
			$("#answersBox").append("<p class='correctAnswer'>Wrong answer!</p>");
			break;
		case 3:
			$("#answersBox").append("<p class='correctAnswer'>You ran out of time!</p>");	
	}

	$("#answersBox").append("<p class='correctAnswer'>" + questions[currQuestion].answers[i].ans + "</p>")
	var timeOut = setTimeout(function() {
		currQuestion++;
        loadQuestion(currQuestion);
	}, 3000)
}

function startTimer() {
    clearInterval(gameTimer);
    answerTime = const_answerTime;
    gameTimer = setInterval(function() {
        answerTime--;
        $("#timer").html(timeConverter(answerTime));
        if (answerTime === 0) {
            unAnswered++;
            showAnswer(3);
        }
    }, 1000);
}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

window.onload = function() {
    //generate first question
    $(document).on("click", "#startBtn", function() {
        $("#question").css("display", "inline-block");
        loadQuestion(currQuestion);
    });
    $(document).on("click", ".answer", function() {
        //if answer is correct, update correct answers, otherwise update wrong answers.
        if (questions[currQuestion].answers[$(this).data("index")].isCorrect === true) {
            correctAnswers++;
            showAnswer(1);
        } else {
            wrongAnswers++;
            showAnswer(2);
        }
    });


}