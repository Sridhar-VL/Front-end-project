// Player constructor
function Player(name, health, attackPower) {
  this.name = name;
  this.health = health;
  this.attackPower = attackPower;

  this.attack = function (opponent) {
    let damage = Math.floor(Math.random() * this.attackPower);
    opponent.health -= damage;
    if (opponent.health < 0) opponent.health = 0;
    playSound(this.name + "attack");
    updateUI();
  };

  this.heal = function () {
    let heal = Math.floor(Math.random() * 10);
    this.health += heal;
    if (this.health > 100) this.health = 100;
    playSound(this.name + "heal");
    updateUI();
  };
}

// Game logic
const game = {
  isOver: false,

  checkWinner: function () {
    if (player1.health <= 0) return "Player 2 Wins!";
    if (player2.health <= 0) return "Player 1 Wins!";
    return "";
  },

  reset: function () {
    player1.health = 100;
    player2.health = 100;
    this.isOver = false;
    document.getElementById("result").innerText = "";
    updateUI();
  }
};

// Create players
let player1 = new Player("p1", 100, 10);
let player2 = new Player("p2", 100, 10);

// Update screen
function updateUI() {
  document.getElementById("p1Health").innerText = player1.health;
  document.getElementById("p2Health").innerText = player2.health;

  let result = game.checkWinner();
  if (result) {
    game.isOver = true;
    document.getElementById("result").innerText = result;
    playSound("victory");
  }
}

// Play sound
function playSound(id) {
  let sound = document.getElementById(id);
  if (sound) sound.play();
}

// Simulate random battle
document.getElementById("play").onclick = function () {
  if (game.isOver) return;

  Math.random() < 0.5 ? player1.attack(player2) : player1.heal();
  Math.random() < 0.5 ? player2.attack(player1) : player2.heal();
};

// Reset game
document.getElementById("reset").onclick = function () {
  game.reset();
};

// Keyboard controls
document.addEventListener("keydown", function (event) {
  if (game.isOver) return;

  switch (event.key.toLowerCase()) {
    case "q":
      player1.attack(player2);
      break;
    case "a":
      player1.heal();
      break;
    case "p":
      player2.attack(player1);
      break;
    case "l":
      player2.heal();
      break;
  }
});
