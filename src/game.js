
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

nextSequence();

// Add on-click event listener to buttons
$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function animatePress(color)
{
    var buttonElem = $("div#" + color);
    buttonElem.addClass("pressed");
    setTimeout(function (){
        buttonElem.removeClass("pressed")
    }, 150);
}

function nextSequence()
{
    userClickedPattern = [];

    var random = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(color)
{
    var sound = new Audio("assets/sounds/" + color + ".mp3");
    sound.play();
}