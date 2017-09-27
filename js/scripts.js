var turnScore = 0;
var turnIndex = 0;

function Player(playername, playerscore) {
  this.playername = playername;
  this.playerscore = playerscore;
}

Player.prototype.roll = function() {
  var currentRoll = Math.floor(Math.random() * 6) + 1;

  if (currentRoll === 1) {
    turnScore = 0;
    updateDisplay(currentRoll);
    nextTurn();
  }
  else {
    turnScore += currentRoll;
    updateDisplay(currentRoll);
  }
}

Player.prototype.hold = function() {
  this.playerscore += turnScore;
}
var nextTurn = function() {
  alert("Next Turn");
  turnScore = 0;
  if (turnIndex === 0) {
    turnIndex = 1;
  } else {
    turnIndex = 0;
  }

  $(".playerone-box").toggleClass("active-user");
  $(".playertwo-box").toggleClass("active-user");
};

var Player1 = new Player(prompt("Player 1, enter your name."), 0);
var Player2 = new Player(prompt("Player 2, enter your name."), 0);
var Players = [Player1, Player2];

var updateDisplay = function(currentRoll) {
  $("#player-current-roll" + turnIndex).text(currentRoll);
  $("#player-turnscore-total" + turnIndex).text(turnScore);
}


$(function() {
  $("#player0").text(Player1.playername);
  $("#player1").text(Player2.playername);

  $("#player-roll-button" + turnIndex).click(function() {
    Players[turnIndex].roll();
  });
  $("#player-hold-button" + turnIndex).click(function() {

    Players[turnIndex].hold();
    $("#playertotal" + turnIndex).text(Players[turnIndex].playerscore);
    if (Players[turnIndex].playerscore >= 100) {
      alert("Game Over!!!" + Players[turnIndex].playername + " wins!");
      location.reload();
    }
    else {
      $("#player-turnscore-total" + turnIndex).text("0");
      $("#player-current-roll" + turnIndex).text("0");

      nextTurn();
    }
  });
});
