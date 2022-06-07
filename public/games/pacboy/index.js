const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

const scoreEl = document.querySelector("#ScoreEl");

canvas.width = innerWidth;
canvas.height = innerHeight;

let boundaryColor = "#4444fc";
let pacManColor = "yellow";
let EnemyColor = "red";

// Class for Boundary
class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = boundaryColor;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// Class for Pellet
class Pellet {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
}

class PowerUp {
  constructor({ position }) {
    this.position = position;
    this.radius = 8;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
}

// Class for Player
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.radians = 0.75;
    this.chompSpeed = 0.12;
    this.rotation = 0;
  }

  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    c.translate(-this.position.x, -this.position.y);
    c.beginPath();
    c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians,
    );
    c.lineTo(this.position.x, this.position.y);
    c.fillStyle = pacManColor;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.radians < 0 || this.radians > 0.75)
      this.chompSpeed = -this.chompSpeed;
    this.radians += this.chompSpeed;
  }
}
class Ghost {
  static speed = 2;
  constructor({ position, velocity, color = EnemyColor }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
    this.speed = 2;
    this.scared = false;
    this.prevCollisions = [];
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.scared ? boundaryColor : this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
const map = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", ".", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
  ["-", ".", "-", ".", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", "p", ".", "-"],
  ["-", ".", "-", "-", ".", ".", ".", "-", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", ".", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", "-", ".", ".", ".", "-", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", "p", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", ".", ".", ".", ".", "p", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const boundaries = [];
const pellets = [];
const powerUps = [];
const ghosts = [
  new Ghost({
    position: {
      x: Boundary.width * 5 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
  }),
  new Ghost({
    position: {
      x: Boundary.width + Boundary.width / 2,
      y: Boundary.height * 7 + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
  }),
  new Ghost({
    position: {
      x: Boundary.width * 7 + Boundary.width / 2,
      y: Boundary.height * 11 + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
  }),
];

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: { x: 0, y: 0 },
});
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === "-") {
      boundaries.push(
        new Boundary({
          position: { x: Boundary.width * j, y: i * Boundary.height },
        }),
      );
    } else if (symbol == ".") {
      pellets.push(
        new Pellet({
          position: {
            x: j * Boundary.width + Boundary.width / 2,
            y: i * Boundary.height + Boundary.height / 2,
          },
        }),
      );
    } else if (symbol == "p") {
      powerUps.push(
        new PowerUp({
          position: {
            x: j * Boundary.width + Boundary.width / 2,
            y: i * Boundary.height + Boundary.height / 2,
          },
        }),
      );
    }
  });
});

let lastkey = "";
let score = 0;

function circleCollidesWithRectangle({ circle, rectangle }) {
  const padding = Boundary.width / 2 - circle.radius - 1;
  return (
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width + padding &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x - padding &&
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height + padding &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y - padding
  );
}

let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = ghosts.length - 1; i >= 0; i--) {
    const ghost = ghosts[i];
    if (
      Math.hypot(
        ghost.position.x - player.position.x,
        ghost.position.y - player.position.y,
      ) <=
      player.radius + ghost.radius
    ) {
      if (ghost.scared) {
        ghosts.splice(i, 1);
        score += 100;
        scoreEl.innerHTML = score;
      } else {
        scoreEl.innerHTML = score + "     Game Over";
        cancelAnimationFrame(animationId);
      }
    }
  }
  if (pellets.length == 0) {
    cancelAnimationFrame(animationId);
    scoreEl.innerHTML = score + "     You Win";
  }

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];
    powerUp.draw();
    if (
      Math.hypot(
        powerUp.position.x - player.position.x,
        powerUp.position.y - player.position.y,
      ) <=
      player.radius + powerUp.radius
    ) {
      score -= 10;
      scoreEl.innerHTML = score;
      powerUps.splice(i, 1);
      ghosts.forEach((ghost) => {
        ghost.scared = true;
        setTimeout(() => (ghost.scared = false), 5000);
      });
    }
  }
  for (let i = pellets.length - 1; i >= 0; i--) {
    const pellet = pellets[i];
    pellet.draw();
    if (
      Math.hypot(
        pellet.position.x - player.position.x,
        pellet.position.y - player.position.y,
      ) <=
      player.radius + pellet.radius
    ) {
      pellets.splice(i, 1);
      score += 10;
      console.log("colliding");
      scoreEl.innerHTML = score;
    }
  }
  boundaries.forEach((boundary) => {
    boundary.draw();

    if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
      console.log("collision");
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();

  if (keys.w.pressed && lastkey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: -5 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastkey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: -5, y: 0 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastkey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: 5 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastkey === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 5, y: 0 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }
  ghosts.forEach((ghost) => {
    const collisions = [];
    boundaries.forEach((boundary) => {
      if (
        !collisions.includes("right") &&
        circleCollidesWithRectangle({
          circle: { ...ghost, velocity: { x: ghost.speed, y: 0 } },
          rectangle: boundary,
        })
      ) {
        collisions.push("right");
      } else if (
        !collisions.includes("left") &&
        circleCollidesWithRectangle({
          circle: { ...ghost, velocity: { x: -ghost.speed, y: 0 } },
          rectangle: boundary,
        })
      ) {
        collisions.push("left");
      } else if (
        !collisions.includes("top") &&
        circleCollidesWithRectangle({
          circle: { ...ghost, velocity: { x: 0, y: -ghost.speed } },
          rectangle: boundary,
        })
      ) {
        collisions.push("top");
      } else if (
        !collisions.includes("bottom") &&
        circleCollidesWithRectangle({
          circle: { ...ghost, velocity: { x: 0, y: ghost.speed } },
          rectangle: boundary,
        })
      ) {
        collisions.push("bottom");
      }
    });
    console.log(collisions);
    if (collisions.length > ghost.prevCollisions.length)
      ghost.prevCollisions = collisions;
    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      console.log("Collisions:", collisions);
      console.log("Prev Collisions:", ghost.prevCollisions);
      if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push("bottom");
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push("top");

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });
      const direction = pathways[Math.floor(Math.random() * pathways.length)];

      switch (direction) {
        case "right":
          ghost.velocity.y = 0;
          ghost.velocity.x = ghost.speed;
          break;
        case "left":
          ghost.velocity.y = 0;
          ghost.velocity.x = -ghost.speed;
          break;
        case "top":
          ghost.velocity.x = 0;
          ghost.velocity.y = -ghost.speed;
          break;
        case "bottom":
          ghost.velocity.x = 0;
          ghost.velocity.y = ghost.speed;
          break;
      }
      ghost.prevCollisions = [];
    }
    ghost.update();
  });

  if (player.velocity.x > 0) player.rotation = 0;
  else if (player.velocity.x < 0) player.rotation = Math.PI;
  else if (player.velocity.y > 0) player.rotation = Math.PI / 2;
  else if (player.velocity.y < 0) player.rotation = (Math.PI * 3) / 2;
}

animate();

//Evenet listeners
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastkey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastkey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastkey = "s";

      break;
    case "d":
      keys.d.pressed = true;
      lastkey = "d";

      break;
  }
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
