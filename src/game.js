
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

var highscore = 0; //TODO: Yet to be able to retain value for a session
$("#highscoreMsg").hide();

$(document).on("keydown", function(){
    if (!gameStart)
    {
        if($("#highscoreMsg"))
        {
            $("#highscoreMsg").hide();
        }

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});


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

    checkAnswer(userClickedPattern.length-1); //Index of last pattern color selected
}


function nextSequence()
{
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    var random = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(levelAnswer)
{
    if (gamePattern[levelAnswer] === userClickedPattern[levelAnswer])
    {
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else
    {
        if (gamePattern.length > highscore)
        {
            highscore = gamePattern.length;
            console.log("HS!");
            $("#highscoreMsg").show();
        }
        gameOver();
    }
}

function gameOver()
{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    
    startOver();
}

function startOver()
{
    gameStart = false;
    level = 0;
    gamePattern = [];
}

function playSound(name)
{
    var sound = new Audio("assets/sounds/" + name + ".mp3");
    sound.play();
}