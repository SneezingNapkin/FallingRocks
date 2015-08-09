var canvas;
var stage;
var leftdown;
var rightdown;
var person;
var rocks;
var collision;
var gameover;
var gamestart;
var ui;

var GAMEWIDTH;
var GAMEHEIGHT;

var startrocks = 10;
var rockincrement = 2;
var rockincrementspeed = 10;
var lastcreatedrock = 0;
var art = {};

var gamekilled = false;

// this will increment in one of the functions below to check if all images are downloaded:
var imagecount = 0;
//this is for me to increment manually. It shows how many images we have added to the server:
var totalimages = 2;

// Have to have the "function init()" to be able to run the game.
function init() {
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);

  GAMEWIDTH = canvas.width;
  GAMEHEIGHT = canvas.height;

  gamestart = new MainMenu();

  collision = new CollisionManager();

      stage.update();

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  //RAF is request animation frame - this is relatively new and some old browsers will not be able to support this.
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
  // update all the things that happen in the game:
  if (!collision.collisiondetected) {
    if (person){
      person.update(event);
    }
    if (ui){
      ui.update(event);
    }
    if (rocks){
      for (i = 0; i < rocks.length; i++) {
        rocks[i].update(event);
      }
      // Make more rocks fall every 10 seconds:
        if (Math.round(ui.count/1000) % rockincrementspeed == 0) {
          if (lastcreatedrock < Math.round(ui.count/1000)) {
            lastcreatedrock = Math.round(ui.count/1000);
            rocks.push(new Rock());
          }
        }
      collision.update(rocks, person);
    }
  }
  stage.update(event);

  //.push(something)
  // rocks.length
  if (collision.collisiondetected && !gamekilled) {
    killgame();
    gamekilled = true;
  }
}

function handlekeydown (e) {
  if (e.which === 37) {
    leftdown = true;
  }
  else if (e.which === 39) {
    rightdown = true;
  }
}

function handlekeyup (e) {
  if (e.which === 37) {
    leftdown = false;
  }
  else if (e.which === 39) {
    rightdown = false;
  }
}

function preload () {
  //creating a blank image:
art.rock = document.createElement('img');
  // telling the program where to look:
art.rock.src = "Art/Boulder.png";
  //
art.rock.onload = preloadcomplete;

art.blob = document.createElement('img');
  // telling the program where to look:
art.blob.src = "Art/blob-52.png";

art.blob.onload = preloadcomplete;

}

function preloadcomplete() {
  imagecount = imagecount + 1;
  console.log(imagecount);
  if (imagecount == totalimages) {
    init()
  }
}

function killgame () {
  for (i = 0; i< rocks.length; i++) {
    rocks[i].kill();
  }
  document.removeEventListener("keydown", handlekeydown);
  document.removeEventListener("keyup", handlekeyup);
  if (!gameover) {
    gameover = new GameOver();
  }
}

function createnewgame () {

  if (gamestart) {
    gamestart.kill();
    gamestart = undefined;
  };

  //clears the stage of all the rocks and other things
  stage.removeAllChildren();

  // create a shape to draw the background into:
  var bg = new createjs.Shape();
  stage.addChild(bg);

  // adding the person into the game:
  person = new Dude();
  document.addEventListener("keydown", handlekeydown);
  document.addEventListener("keyup", handlekeyup);

  // adding the rocks into the game:
  rocks = [];
  for (i = 0; i< startrocks; i++) {
    rocks.push(new Rock());
  }

  gamekilled = false;
  collision = new CollisionManager();
  leftdown = false;
  rightdown = false;
  if (gameover) {
    gameover.kill();
    gameover = undefined;
  }
  ui = new UI();
}
