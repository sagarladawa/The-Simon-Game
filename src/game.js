
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Add on-click event listener to buttons
$(".btn").on("click", userButtonClick);

nextSequence();

function userButtonClick()
{
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
}

function nextSequence()
{
    var random = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);
    var buttonElem = $("div#" + randomChosenColor);
    buttonElem.on("click", function(){
        playSound(randomChosenColor);
        buttonElem.fadeOut("fast", function(){
            buttonElem.show();
        });
    });
}

function playSound(color)
{
    var sound = new Audio("assets/sounds/" + color + ".mp3");
        sound.play();
}