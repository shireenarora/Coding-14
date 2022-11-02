var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.4
  ghost.setCollider("circle",0,0,40)
  ghost.debug = false
  
}

function draw() {
  background(200);
  if (gameState == "play"){
  
  
    if(tower.y > 400){
        tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = - 2
    }

    ghost.velocityY = ghost.velocityY + .2


    if (keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 10
    }

    if (keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 10
    }

    spawnDoors()

    if (climbersGroup.isTouching(ghost)){
      
      ghost.velocityY = 0
      ghost.destroy()
      tower.velocityY = 0
      climbersGroup.destroyEach()
      doorsGroup.destroyEach()
      gameState = "end"
    }
    drawSprites()
  }
  if (gameState == "end"){
    stroke("blue")
    textSize(30)
    text("Game Over", 260,300)
  }
  
}

function spawnDoors(){
  if (frameCount % 200 === 0){
    door = createSprite(200,130)
    door.addImage(doorImg)

    climber = createSprite(200,200)
    climber.addImage(climberImg)

    door.x = Math.round(random(120,400))
    door.velocityY = 1

    climber.x = door.x
    climber.velocityY = 1
    climber.lifetime = 300

    door.lifetime = 300

    ghost.depth = door.depth
    ghost.depth = ghost.depth +1
    doorsGroup.add(door)
    climbersGroup.add(climber)

    
  }
}
