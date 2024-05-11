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
}