// Get references
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');

// --- Game State ---
let running = true;
let score = 0;
let frame = 0;

// --- Player ---
const player = {
  x: 80, y: canvas.height / 2 - 40, width: 40, height: 60,
  vx: 0, vy: 0, speed: 5,
  color: '#33e',
  attack: false,
  canAttack: true,
  attackFrame: 0,
  dodge: false,
  canDodge: true,
  dodgeFrame: 0,
  health: 100,
  invincible: false,
  invinceFrame: 0
};

// --- Enemy ---
function spawnEnemy() {
  let y = Math.random() * (canvas.height - 60);
  let speed = 2 + Math.random() * 1.5 + score/400;
  return {
    x: canvas.width + 40,
    y,
    width: 40,
    height: 60,
    color: '#c33',
    speed,
    hit: false
  };
}
let enemies = [];
let waveTimer = 0;

// --- Input ---
const keys = {};
document.addEventListener('keydown', e => {
  if (e.key === 'r' || e.key === 'R') return location.reload();
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// --- Player Actions ---
function handlePlayerInput() {
  // Movement
  player.vx = player.vy = 0;
  if (keys['w'] && player.y > 0) player.vy = -player.speed;
  if (keys['s'] && player.y < canvas.height - player.height) player.vy = player.speed;
  if (keys['a'] && player.x > 0) player.vx = -player.speed;
  if (keys['d'] && player.x < canvas.width - player.width) player.vx = player.speed;

  // Attack (J)
  if (keys['j'] && player.canAttack && !player.attack) {
    player.attack = true;
    player.canAttack = false;
    player.attackFrame = frame;
    setTimeout(() => player.canAttack = true, 400);
  }
  if (player.attack && frame - player.attackFrame > 15) player.attack = false;

  // Dodge (K)
  if (keys['k'] && player.canDodge && !player.dodge) {
    player.dodge = true;
    player.canDodge = false;
    player.dodgeFrame = frame;
    player.invincible = true;
    player.invinceFrame = frame;
    setTimeout(() => player.canDodge = true, 900);
  }
  if (player.dodge) {
    // Move forward quickly during dodge
    player.x += 16;
    // Don't go off canvas
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (frame - player.dodgeFrame > 10) {
      player.dodge = false;
    }
  }
  // invincibility wears off soon after dodge
  if (player.invincible && frame - player.invinceFrame > 20) player.invincible = false;
}

// --- Collision ---
function rectsCollide(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}

// --- Update and Draw ---
function update() {
  if (!running) return;

  frame++;

  handlePlayerInput();
  player.x += player.vx;
  player.y += player.vy;

  // Clamp player within canvas
  player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
  player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));

  // Spawn enemies in waves
  waveTimer--;
  if (waveTimer <= 0) {
    let count = 1 + Math.floor(score/200);
    for (let i = 0; i < count; i++) {
      enemies.push(spawnEnemy());
    }
    waveTimer = Math.max(60, 180 - score/2);
  }

  // Move enemies and check collisions
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    e.x -= e.speed;

    // Enemy out of bounds
    if (e.x < -e.width) enemies.splice(i, 1);

    // Enemy hit by attack
    if (player.attack && !e.hit) {
      // Simple front range check
      if (Math.abs((player.x + player.width) - e.x) < 35 &&
          Math.abs((player.y) - e.y) < player.height) {
        e.hit = true;
        score += 10;
        setTimeout(() => { // Delay remove for cool effect
          let idx = enemies.indexOf(e);
          if (idx > -1) enemies.splice(idx, 1);
        }, 80);
        continue;
      }
    }

    // Enemy hits player
    if (!e.hit && rectsCollide(player, e)) {
      if (!player.invincible) {
        player.health -= 15;
        player.invincible = true;
        player.invinceFrame = frame;
        if (player.health <= 0) {
          healthDisplay.textContent = 'Health: 0';
          running = false;
          setTimeout(() => alert('Game Over! Final Score: ' + score), 250);
          return;
        }
      }
    }
  }
  score += 1; // passive score increment
}

function drawPlayer() {
  if(player.dodge) {
    ctx.globalAlpha = 0.45;
  } else if(player.invincible) {
    ctx.globalAlpha = 0.7 + 0.3 * Math.cos(frame*0.4);
  } else {
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Attack effect
  if (player.attack) {
    ctx.globalAlpha = 0.85;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width, player.y + player.height/2);
    ctx.lineTo(player.x + player.width + 32, player.y + player.height/2 + ((frame%8 < 4) ? -10 : 10));
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawEnemies() {
  for (let e of enemies) {
    if (e.hit) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#fff";
      ctx.fillRect(e.x-2, e.y-2, e.width+4, e.height+4);
      ctx.restore();
      continue;
    }
    ctx.fillStyle = e.color;
    ctx.globalAlpha = 1;
    ctx.fillRect(e.x, e.y, e.width, e.height);
    // Eyes
    ctx.fillStyle = "#222";
    ctx.fillRect(e.x+24, e.y+20, 4, 8);
    ctx.fillRect(e.x+32, e.y+20, 4, 8);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Arena border
  ctx.strokeStyle = "#5be";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw player
  drawPlayer();

  // Draw enemies
  drawEnemies();

  // Draw score and health bars
  ctx.globalAlpha = 1;
  ctx.font = "20px Segoe UI";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 12, 36);
  ctx.fillText("Health: " + player.health, 680, 36);

  // Draw dodge meter
  if (!player.canDodge) {
    let w = 60 * Math.max(0, 1.05 - (frame-player.dodgeFrame)/53);
    ctx.fillStyle = "#49f";
    ctx.fillRect(player.x+player.width/2-30, player.y+player.height+10, w, 7);
  }
}

function updateUI(){
  scoreDisplay.textContent = "Score: " + score;
  healthDisplay.textContent = "Health: " + player.health;
}

function loop() {
  update();
  draw();
  updateUI();
  if (running) requestAnimationFrame(loop);
}

loop();
