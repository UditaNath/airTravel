var sky,skyImg,player,playerImg,startButton,startButtonImg,playerBurst;
var obstacle,obstacle1Img,obstacle2Img,ostacle3Img,obstacle4Img,obstacle5Img,obstacle6Img;
var gameOver,gameOverImg,restart,restartImg;
var obstaclesGroup;
var scoreSound,gameOverSound,PlaySound;
var score=0;
var time=0;
var START=2;
var PLAY=1;
var FALL=3;
var END=0;
var gameState=START;


function preload(){
  skyImg=loadImage("sky.jpg");
  playerImg=loadAnimation("hotAirBalloon0.png");
  startButtonImg=loadImage("play button0.png");
  obstacle1Img=loadImage("bird10.png");
  obstacle2Img=loadImage("bird20.png");
  obstacle3Img=loadImage("bird30.png");
  obstacle4Img=loadImage("bird40.png");
  obstacle5Img=loadImage("obstacleA0.png");
  obstacle6Img=loadImage("obstacleB0.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restartButton.png")
  scoreSound=loadSound("checkPoint.mp3");
  gameOverSound=loadSound("gameOverSound.wav");
  PlaySound=loadSound("PlaySound.mp3");
    playerBurst=loadAnimation("sprite_1.png","sprite_0.png")

}

function setup() {
 createCanvas(windowWidth,windowHeight);
  sky=createSprite(width/2,height/2);
  sky.addImage(skyImg);
  sky.scale=2;
  
  player=createSprite(70,height/2);
  player.addAnimation("hotAirBalloon",playerImg);
  player.addAnimation("BalloonBurst",playerBurst);
  player.scale=0.2;
  
  startButton=createSprite(width/2,height/2);
  startButton.addImage(startButtonImg);
  
  obstaclesGroup=createGroup();
  
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  restart=createSprite(width/2,height-115);
  restart.addImage(restartImg);
  restart.scale=0.05;
  
   
}

function draw() {
 background("white");
  
  
  
  if(gameState==START){
    sky.velocityX=-1;
    if(sky.x<100){
      sky.x=300;
    }
    player.visible=false;
    startButton.visible=true;
     gameOver.visible=false;
      restart.visible=false;
    if(mousePressedOver(startButton)){
      gameState=PLAY;
      PlaySound.loop();
    
    }
  }
  
  if(gameState==PLAY){
    
    player.visible=true;
    startButton.visible=false;
    gameOver.visible=false;
      restart.visible=false;
    player.velocityY=0;
    
    player.changeAnimation("hotAirBalloon",playerImg)
    
    if(keyIsDown(UP_ARROW)){
      player.y=player.y-5;
    }
    if(keyIsDown(DOWN_ARROW)){
      player.y=player.y+5;
    }
    
    if(player.y<60){
      player.y=60;
    }
    if(player.y>height-60){
      player.y=height-60;
    }
    
    time = time + Math.round(getFrameRate()/30);
    
    if(time%1000==0 && time>0){
      score=score+1;
      scoreSound.play();
    }
    
    spawnObstacles();
    
     
  
    sky.velocityX=-(3 + time/100);
    if(sky.x<100){
      sky.x=300;
    }
      
      if(player.isTouching(obstaclesGroup)){
        player.changeAnimation("BalloonBurst",playerBurst);
        gameState=FALL;
        PlaySound.stop();
        gameOverSound.play();
      }
  }
  
  if(gameState==FALL){
    sky.velocityX=0;
    obstacle.velocityX=0;
    player.velocityY=3; 
    
    
    if(gameState==FALL && player.y>height-60){
      gameState=END;
      
    }
    
  }
  
  if(gameState==END){
    player.visible=false;
    
    sky.velocityX=-1;
    if(sky.x<100){
      sky.x=300;
    }
    obstaclesGroup.destroyEach();
    gameOver.visible=true;
    restart.visible=true;
    
    
        
    if(mousePressedOver(restart)){
      reset();
      
      PlaySound.loop();
    }
    //score=0;
  }
  
  drawSprites();
  
  stroke("black");
  fill("black");
  textSize(15);
  text("time: "+time,width-100,50);
  text("score: "+score,width-100,70);
  if(score>0 && score<5 && gameState==END){
    text("Wow! Your score is: "+score,width/2-100,100);
  }
  if(score>=5 && gameState==END){
    text("Super!!! Only 1% can score: "+score,width/2,100);
  }
  
}

function spawnObstacles(){
  if(frameCount%120==0){
    obstacle=createSprite(width-1,Math.round(random(100,height-100)));
    obstacle.velocityX = -(6 + time/100);
    
    var count = Math.round(random(1,6));
    switch(count) {
      case 1: obstacle.addImage(obstacle1Img);
         obstacle.scale=0.2;
              break;
      case 2: obstacle.addImage(obstacle2Img);
        obstacle.scale=0.2;
              break;
      case 3: obstacle.addImage(obstacle3Img);
        obstacle.scale=0.2;
              break;
      case 4: obstacle.addImage(obstacle4Img);
        obstacle.scale=0.2;
              break;
      case 5: obstacle.addImage(obstacle5Img);
        obstacle.scale=0.5;
              break;
      case 6: obstacle.addImage(obstacle6Img);
        obstacle.scale=0.5;
              break;
      default: break;
    }
    
    obstacle.lifetime = 800;
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score=0;
  obstaclesGroup.destroyEach();
  time=0;
  player.y=height/2;
  
}


