/*Template for p5 Play library
Courtney Edwards - May 2021
This file shows an example for a default sprite*/

//define variables
let val = 2
var bx = 400;
var by = 230;
var cx = 60;
var cy = 100;
let boxSize = 50;

//level variables
var level = 0;
var boxSprite;
var mousePosition;
var spriteBalls;
var padWidth = 12;
var ballDiameter = 15;
var oppenentScore = 0;
var timeGame = 8;
var spriteBot;
var speedBot = 5;
let frictionBot = 0.2;
var padLength = 120;
let stupidSlider = false;
var yourScore = 0;
let yesSlider = false;
let turnOnSlider = false;
let levelZero = false;
var fadingBlock;
let lotsOfBlocks;
let lotsOfBlocks2;
let lotsOfBlocks3;
let buttonLives;
let buttonReset;
let overBox8 = false;
let rightLevel = false;

//preload ball and block animations
function preload() {
  ballImage = loadImage('Ball.png');
  fadingBlock = loadAnimation('Block1.png', 'Block1.png', 'Block2.png', 'Block2.png', 'Block3.png', 'Block3.png', 'Block4.png', 'Block4.png', 'Block5.png', 'Block5.png', 'Block6.png', 'Block6.png', 'Block7.png', 'Block7.png', 'Block8.png', 'Block8.png', 'Block9.png', 'Block9.png', 'Block10.png', 'Block10.png', 'Block11.png', 'Block11.png', 'Block12.png', 'Block12.png', "Block13.png", "Block13.png");
}

//setup
function setup() {
  createCanvas(800, 600);
  rectMode(RADIUS);
  strokeWeight(2);
  //create sprite for player and balls, give ball velocity
  //by assigning the sprite to a variable, we can change properties of the sprite
  boxSprite = createSprite(padWidth / 2, 200, padWidth, padLength);
  boxSprite.shapeColor = 0;// color black
  spriteBalls = createSprite(width / 2, height / 2, ballDiameter, ballDiameter);
  spriteBalls.addImage(ballImage);
  spriteBalls.shapeColor = 0;
  spriteBalls.velocity.y = 0;
  spriteBot = createSprite(800 - padWidth / 2, 200, padWidth, padLength);
  spriteBot.shapeColor = 0;
  spriteBot.friction = frictionBot; // set friction of Bot sprite to value of frictionBot variable
  spriteBot.attractionPoint(5, 800 - padWidth / 2, spriteBalls.position.y); // attraction point to make bot follow ball
  buttonLives = createButton('Add # Points To Win'); //button for lives
  buttonLives.position(10, 400);
  buttonLives.mousePressed(changeBG);
  buttonReset = createButton('Reset Number'); //button to reset lives to 2
  buttonReset.position(10, 470);
  buttonReset.mousePressed(resetBG);
  lotsOfBlocks = createSprite(10000, 10000 / 2, 30, 30); //create block
  lotsOfBlocks2 = createSprite(10000, 10000);
  lotsOfBlocks3 = createSprite(10000, 10000);
  //add animation to the blocks
  lotsOfBlocks.addAnimation("fade", fadingBlock);
  lotsOfBlocks.setCollider("circle", 0, 0, 30);
  spriteBalls.bounce(lotsOfBlocks);
  lotsOfBlocks2.addAnimation("fade", fadingBlock);
  lotsOfBlocks2.setCollider("circle", 0, 0, 30);
  spriteBalls.bounce(lotsOfBlocks2);
  lotsOfBlocks3.addAnimation("fade", fadingBlock);
  lotsOfBlocks3.setCollider("circle", 0, 0, 30);
  spriteBalls.bounce(lotsOfBlocks3);
}

function draw() {
  background(255, 255, 255);
  stroke(0);
  rect(0, 0, 800, 600);
  noStroke();
  //function for the slider
  sliders();

    //drawSprites() is necessary in order to see the sprites on the screen 
  //home screen
  if (level === 0) {
    //while mousePressed();
    //background(255,255,255);
    //Show the instructions to the user 
    rightLevel = false;
    overBox6 = false;
    overBox7 = false;
    levelZero = false;
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Welcome to Block Pong. \n 1. Press on level of difficulty to begin", width / 2, height / 5);
    /*--------------------END INSTRUCTIONS--------------------*/
    // Test if the cursor is over the boxes
    boxBeginner();
    boxConfigureOptions();
    boxEasy();
    boxNormal();
    boxHard();
    boxImpossible();
    //button for lives
    text(val, 10, 450);
    buttonLives.position(10, 400);
    buttonReset.position(10, 470);
    textSize(25);
    stroke(156, 39, 176);
    fill(0);
    text("Use the mouse!", 700, 500);


    /*--------------------GAME--------------------*/
    //First level of gameplay
} else if (level === 1) {
  overBox8 = false;
  //make the button out of screen(will do not anything anyways as it is only used in home level)
  buttonLives.position(10000, 10000);
  buttonReset.position(10000, 10000);
  //let ball begin moving
  onStart();
  //show speed of the ball and only show 2 digits after the decimal point using nf() 
  speedBallText();
  drawSprites();
  ballMovement();
  time();
  spritePosition();
  botPosition();
  drawScore();
  onWin();

  //Win screen (making it a level works)
} else if (level === 2) {
  overBox6 = false;
  overBox2 = false;
  overBox3 = false;
  overBox7 = false;
  overBox8 = false;
  //remove the slider if there is one
  sliderRemoval();
  background((173, 216, 230))
  textSize(75);
  text("You Won!!! \n Next level?", 250, 150);
  //button for pressing no
  noButton();
  if (levelZero === true) {
    level = 0;
  }
  //button for pressing yes
  yesButton();
  //losing screen
} else if (level === 3) {
  yourScore = 0;
  opponentScore = 0;
  sliderRemoval();
  background(15, 15, 24);
  textSize(75);
  fill(255, 255, 255);
  text("Sorry, You Lost", 150, 150);
  //test if mouse is over box
  if (
    mouseX > bx - 150 - boxSize &&
    mouseX < bx - 150 + boxSize &&
    mouseY > by + 250 - boxSize / 2 &&
    mouseY < by + 250 + boxSize / 2
  ) {
    overBox8 = true
    stroke(255);
    fill(173, 255, 47);
  } else {
    stroke(156, 39, 176);
    fill(173, 255, 47);
    overBox8 = false;
  }
  // Draw the box
  rect(bx - 100, by + 250, boxSize, boxSize / 2);
  textSize(20);
  text("Try Again", bx - 145, by + 255);
  //second level of gameplay
} else if (level === 4) {
  overBox8 = false;
  //set the block positions that will affect the ball's path
  lotsOfBlocks.position.x = width / 2;
  lotsOfBlocks.position.y = height / 2;
  lotsOfBlocks2.position.x = width / 4;
  lotsOfBlocks2.position.y = height / 2;
  lotsOfBlocks3.position.x = width - width / 4;
  lotsOfBlocks3.position.y = height / 2;
  spriteBalls.bounce(lotsOfBlocks);
  spriteBalls.bounce(lotsOfBlocks2);
  spriteBalls.bounce(lotsOfBlocks3);
  if (spriteBalls.bounce) {
    spriteBalls.addSpeed(5, random(360));
    spriteBalls.position.x <= width;
    spriteBalls.position.y <= height;
  }
  onStart();
  //show speed of the ball and only show 2 digits after the decimal point using nf() 
  speedBallText();
  drawSprites();
  ballMovement();
  time();
  spritePosition();
  botPosition();
  drawScore();
  onWin();
  rightLevel = true;
  //win screen for the second level that directs the user to home screen
} else if (level === 5) {
  background(173, 216, 230);
  fill(255, 255, 255);
  textSize(40);
  text("Congrats!! \n Press Enter \n to try again", 30, 30);
}

}