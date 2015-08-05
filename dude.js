function Dude () {

  console.log('Created a dude')

  this.previousanimation;

  //creating the animation image:
  var data = {
      images: [art.blob],
      frames: {width:52, height:50},
      animations: {
          stand:[0,1,"stand",0.1],
          moveleft:[4,5,"moveleft",0.1],
          moveright:[2,3,"moveright",0.1],
          scared:[6]
      }
  };
  this.spriteSheet = new createjs.SpriteSheet(data);
  this.sprite = new createjs.Sprite(this.spriteSheet, "stand");

  //where it starts:
  this.position = {
    x: GAMEWIDTH/2,
    y: GAMEHEIGHT-50
  }

  this.sprite.x = this.position.x
  this.sprite.y = this.position.y

  stage.addChild(this.sprite);
}

Dude.prototype = {
  speed: 50,
  width: 52,
  height: 50,

  update: function (e) {
    MOVELEFT = "left"; // this can be a number or any other value - it doesn't matter what it is as long as it is different from the MOVERIGHT value.
    MOVERIGHT = "right";
    // console.log('dude is moving', arguments)
    //debugger;
    if (leftdown && this.position.x > 0) {
      this.position.x = this.position.x - this.speed/e.delta;
      if (this.previousanimation != MOVELEFT){ // I have set this to the variable MOVELEFT for ease of reading, but I could have left it as "left" or any other variable.
        this.sprite.gotoAndPlay("moveleft");
        this.previousanimation = MOVELEFT;
      }
    }
    else if (rightdown && this.position.x < GAMEWIDTH - this.width){
      this.position.x = this.position.x + this.speed/e.delta;
      if (this.previousanimation != "right"){ // I have left this to the variable as "right" to show that it can also be coded like this.
        this.sprite.gotoAndPlay("moveright");
        this.previousanimation = "right";
      }
    }
    else if (!leftdown && !rightdown && this.previousanimation != "standing") {
      this.sprite.gotoAndPlay("stand");
      this.previousanimation = "standing";
    }

    if (!leftdown && !rightdown && collision.nearcollisiondetection) {
      this.sprite.gotoAndPlay("scared");
      
    }

    this.sprite.x = this.position.x;
  }
};
