var bg, rocket, rocketImg;
var fuel, fuelImg, obstacle, obstacleImg, star, starImg, ufo, ufoImg;
var fuelGroup, obstacleGroup, starGroup, ufoGroup;

function preload() {
  // put preload code here
  bg = loadImage("./images/background.jpg");
  rocketImg = loadImage("./images/rocket.png");
  fuelImg = loadImage("./images/Fuel.png");
  obstacleImg = loadImage("./images/obstacle.png");
  starImg = loadImage("./images/Star.png");
  ufoImg = loadImage("./images/UFO.png");
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
}

function draw() {
  // put drawing code here
  background(bg);

  addSprites(fuelGroup, 2, fuelImg, 0.1);
  addSprites(obstacleGroup, 2, obstacleImg, 0.1);
  addSprites(starGroup, 4, starImg, 0.1);
    addSprites(ufoGroup, 3, ufoImg, 0.1);

  // player movement

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
