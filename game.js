let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(".btn").click(function () {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".start-btn").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextSequence();
        }, 500);
        started = true;
        $( ".start-btn" ).addClass("display-none");
    }
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};


function nextSequence() {
    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    level++;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};


function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        let wrong = new Audio(`sounds/wrong.mp3`);
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, press any key or push the button to Restart");
        startOver();
        $( ".start-btn" ).removeClass("display-none");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}