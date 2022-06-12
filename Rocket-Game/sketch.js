var bg, rocket, rocketImg;
var fuel,
  fuelImg,
  obstacle,
  obstacleImg,
  star,
  starImg,
  ufo,
  ufoImg,
  bulletImg;
var fuelGroup, obstacleGroup, starGroup, ufoGroup, bulletGroup;
var score = 0;
var life = 3;

function preload() {
  // put preload code here
  bg = loadImage("./images/background.jpg");
  rocketImg = loadImage("./images/rocket.png");
  fuelImg = loadImage("./images/Fuel.png");
  obstacleImg = loadImage("./images/obstacle.png");
  starImg = loadImage("./images/Star.png");
  ufoImg = loadImage("./images/UFO.png");
  bulletImg = loadImage("./images/bullet.png");
}

function setup() {
  createCanvas(1600, 900);
  // put setup code here
  rocket = createSprite(800, 800, 50, 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.3;

  fuelGroup = new Group();
  obstacleGroup = new Group();
  starGroup = new Group();
  ufoGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  // put drawing code here
  background(bg);
  textSize(25);
  text("Score: " + score, 10, 30);
  text("Life:    " + life, 10, 60);

  addSprites(fuelGroup, 2, fuelImg, 0.1);
  addSprites(obstacleGroup, 2, obstacleImg, 0.5);
  addSprites(starGroup, 4, starImg, 0.1);
  addSprites(ufoGroup, 3, ufoImg, 0.1);

  // player movement
  if (keyDown("left_arrow")) {
    rocket.x -= 6;
  }

  if (keyDown("right_arrow")) {
    rocket.x += 6;
  }

  if (keyDown("space")) {
    shootBullet();
  }

  // player events
  if (starGroup.isTouching(rocket)) {
    handleStars();
  }

  if (obstacleGroup.isTouching(rocket)) {
    handleObstacles();
  }

  if (ufoGroup.isTouching(rocket)) {
    handleUFOs();
  }

  // game events
  if (life == 0) {
    textSize(50);
    text("Game Over", width / 2 - 100, height / 2);
    fuelGroup.removeEach();
    obstacleGroup.removeEach();
    starGroup.removeEach();
    ufoGroup.removeEach();
    rocket.remove();
  }

  drawSprites();
}

function addSprites(
  spriteGroup,
  numberOfSprites,
  spriteImage,
  scale,
  positions = []
) {
  if (frameCount % 180 === 0) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(0, width);
        y = 0;
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);
      sprite.velocityY = random(1, 3);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }
}

function handleStars() {
  rocket.overlap(starGroup, function (collector, collected) {
    collected.remove();
    score += 5;
  });
}

function handleObstacles() {
  rocket.overlap(obstacleGroup, function (collector, collected) {
    collected.remove();
    life -= 1;
  });
}

function handleUFOs() {
  rocket.overlap(ufoGroup, function (collector, collected) {
    // player.fuel = 185;
    collected.remove();
    score -= 3;
  });
}

function shootBullet() {
  var bullet = createSprite(rocket.x, rocket.y);
  bullet.addImage(bulletImg);
  bullet.velocityY = -6;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}
