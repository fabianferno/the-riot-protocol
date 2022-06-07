const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;
class Sprite {
  constructor(position, velocity, color, offset) {
    this.position = position;
    this.velocity = velocity;
    this.health = 100;
    this.height = 150;
    this.width = 50;
    this.color = color;
    this.isAttacking = false;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    };
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height,
      );
    }
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
let player1Color = "red";
let player2Color = "blue";
let backgroundColor = "black";

const player = new Sprite({ x: 100, y: 100 }, { x: 0, y: 10 }, player1Color, {
  x: 0,
  y: 0,
});
const enemy = new Sprite({ x: 200, y: 200 }, { x: 0, y: 10 }, player2Color, {
  x: -50,
  y: 0,
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

let timer = 60;
function determineWinner() {
  if (timer <= 0) {
    document.querySelector("#resultText").style.display = "flex";
    if (player.health === enemy.health)
      document.querySelector("#resultText").innerHTML = "Tie";
    else if (player.health > enemy.health)
      document.querySelector("#resultText").innerHTML = "Player 1 Wins";
    else document.querySelector("#resultText").innerHTML = "Player 2 Wins";
  }
}
function decreaseTimer() {
  if (player.health <= 0 || enemy.health <= 0) timer = 0;
  if (timer >= 0) {
    setTimeout(decreaseTimer, 1000);
    document.querySelector("#timer").innerHTML = timer;
    timer--;
  }

  determineWinner();
}

decreaseTimer();

function animate() {
  //basic settings
  window.requestAnimationFrame(animate);
  c.fillStyle = backgroundColor;
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //player movement

  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey == "a") player.velocity.x = -5;
  else if (keys.d.pressed && player.lastKey == "d") player.velocity.x = 5;

  //enemy movement

  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft")
    enemy.velocity.x = -5;
  else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight")
    enemy.velocity.x = 5;

  //detect for collision
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("Player attacking");
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    if (this.health <= 40)
      document.querySelector("#enemyHealth").style.backgroundColor = "red";
    else if (this.health <= 60)
      document.querySelector("#enemyHealth").style.backgroundColor = "yellow";
  }

  if (
    enemy.attackBox.position.x <= player.position.x + player.width &&
    enemy.position.x >= player.position.x + player.width &&
    enemy.attackBox.position.y + enemy.attackBox.height >= player.position.y &&
    enemy.attackBox.position.y <= player.position.y + player.height &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    console.log("Enemy attacking");
    document.querySelector("#playerHealth").style.width = player.health + "%";
    if (this.health <= 20)
      document.querySelector("#playerHealth").style.backgroundColor = "red";
    else if (this.health <= 40)
      document.querySelector("#playerHealth").style.backgroundColor = "orange";
    else if (this.health <= 60)
      document.querySelector("#playerHealth").style.backgroundColor = "yellow";
  }
}

window.addEventListener("keydown", (event) => {
  // console.log(player.velocity.x);

  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;

    case "ArrowDown":
      enemy.attack();
      break;
  }
});
window.addEventListener("keyup", (event) => {
  // console.log(event);

  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
animate();
