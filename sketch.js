/*Template for p5 Play library
Courtney Edwards - May 2021
This file shows an example for a default sprite*/

var boxSprite;

function setup() {
  createCanvas(800,400);
  //this is to create a default sprite. By including 50,50 at the end (optional), it sets the size of the rectangular sprite
  //by assigning the sprite to a variable, we can change properties of the sprite
  boxSprite = createSprite(400, 200, 50, 50);
}

function draw() {
  background(255,255,255); 
  //drawSprites() is necessary in order to see the sprites on the screen 
  drawSprites();
}