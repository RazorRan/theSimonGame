var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started=false;

function nextSequence() {
  userClickPattern = [];
  var a = Math.random();
  a = Math.floor(a * 4);

  var randomChosenColor = buttonColor[a];

  playSound(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColor);

  level++;

  $("h1").text("Level " + level);

}


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  animatePress(userChosenColor);

  playSound(userChosenColor);

  userClickPattern.push(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});


function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(event) {
  if(!started){
  nextSequence();
  started=true;
}
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

    console.log("success");

    if (userClickPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game Over, Press any key to restart");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  started=false;
}
