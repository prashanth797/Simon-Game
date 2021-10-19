var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;


//***********************STEP [01] STARTING GAME*******************//
$(document).keydown(function() {
  if (!started) { //PRESS A KEY (started) is intiatially "false" after reload enters "if" condition

    $("#level-title").text("Level " + level); //changes h1 to level 0
    nextSequence(); //calls this function
    started = true; //*******(started) becomes true and this function does not executes untill page is reloaded
  }
});


//**************************STEP [02] RANDOM SYSTEM PATTERN****************//

function nextSequence() {

  userClickedPattern = []; //CLEAR USER CLICK PATTERN

  level++;
  $("#level-title").text("Level " + level); //*****INCREASE LEVEL NUMBER

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); ///***************PUSH RANDOM COLORS

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  console.log(gamePattern); //*******MAKES RANDOM COLOR CHOICE AND EXITS FUCNTION
}



//*******STEP [3] USER PATTERN*******************//
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //USERS' TURN TO SELECT PATTERSN SAME AS SYSTEM PATTERN
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1); ///CALL STEP 4 CHECKING THE ANSWER FUNTION BEFORE EXITING THE FUNCTION
});

//*****************STEP [4] ANSWER CHECKER***************//
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//*************STEP [5] RESTART***************
 function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
 }

 function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
