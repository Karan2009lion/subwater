var PLAY=1;
var END =0;  
var gameState = PLAY;
var subIMG,sub;
var unwater,unwaterIMG;
var bat,bateryIMG;
var monster1,monster2;
var monster1IMG,monster2IMG;
var score;
var bord,bordIMG,Bord1Img;
var restart,restartIMG;




function preload(){

  subIMG = loadImage("sub.png");
  bateryIMG=loadImage("bat.png");
  unwaterIMG=loadImage("background.jpg");
  monster1IMG=loadImage("mon1.png");
  monster2IMG=loadImage("mon2.png");
  bordIMG=loadImage("you win.png");
  Bord1Img=loadImage("gameover.png");
  restartIMG=loadImage("restert.png");

}

function setup() {
 createCanvas(600,300);

 unwater = createSprite(10,10,400,200);
 unwater.addImage(unwaterIMG);
 unwater.scale=4.3;
 unwater.velocityX=-3;

 sub = createSprite(100,360,50,50);
 sub.addImage(subIMG);
 sub.scale=0.2;

 restart=createSprite(300,100,50,50);
 restart.addImage(restartIMG);
 restart.scale=0.2;
 restart.visible=false;

 bord = createSprite(150,200,600,200);
 bord.visible=false;
 
 

 batGroup = createGroup();
 monGroup = createGroup();

 score=0;


}

function draw() {

  background(180);
  text("Score: "+score,190,30);
  if (unwater.x<200){
    unwater.x=unwater.width/2;
 }
console.log(unwater.x);
 if(gameState === PLAY){
  
  

  score = score+Math.round(getFrameRate()/60);

 
 if (sub.isTouching(batGroup)){
  
  score=score+10;

}
if(sub.isTouching(monGroup)){
  gameState = END;
}
 }
 else if (gameState === END){
  bord.visible=true;
  restart.visible=true;

  unwater.velocityX=0;
  

  monGroup.setVelocityXEach(0);
  batGroup.setVelocityXEach(0);

 }
  



  
 

 

  if (mousePressedOver(restart)){
    
    console.log("restarting the game");
    reset();

  }


  sub.y=World.mouseY;

    drawSprites();


}

function bat(){
 
  if(World.frameCount%60===0){
   bat=createSprite(300,200,20,20);
   bat.addImage(bateryIMG);
   bat.x=0

   bat.velocityX=(7+(score/4));
   bat.scale=0.2;
   
   bat.y=Math.round(random(50,350));

   bat.setLifetime=400;

   batGroup.add(bat);
   
  }



}

function mon(){
 
  if(World.frameCount%90===0){
    
    mon=createSprite(300,200,20,20);
    mon.x-0

    mon.velocityX=(7+(score/4));

    mon.scale=0.2;

    r=Mth.round(random(1,2));

    if (r==1) {
      mon.addImage(monster1IMG);
    } else if (r==2){
      mon.addImage(monster2IMG);
    }

   mon.y=Math.round(random(50,350));
   mon.setLifetime=400;
   monGroup.add(mon);

  }


}

function reset(){
  
  score=0;
  bord.visible=false;
  restart.visible=false;
  batGroup.destroyEach();
  monGroup.destroyEach();

}