function Rock () {

  console.log('Created a rock')

  this.bitmap = new createjs.Bitmap(art.rock);
  this.bitmap.scaleX = 0.5;
  this.bitmap.scaleY = 0.5;


  this.position = {
    x: this.randomx(),
    y: this.randomy()
  };

  this.bitmap.x = this.position.x;
  this.bitmap.y = this.position.y;
  // this.rotationSpeed = Math.random() * 5;
  // this.bitmap.rotationMatrix = new Matrix2D(x, y)

  stage.addChild(this.bitmap);
}

Rock.prototype = {
  speed: 50,
  width: 50,
  height:50,
  // rotationSpeed: 0,

  update: function (e) {
    this.position.y = this.position.y + this.speed/e.delta;
    if (this.position.y > GAMEHEIGHT){
      this.position.y = this.randomy();
      this.position.x = this.randomx();
      }
    this.bitmap.y = this.position.y;
    this.bitmap.x = this.position.x;
    // this.bitmap.rotation += this.rotationSpeed;
  },

  randomx: function() {
    return Math.random() * GAMEWIDTH
  },

  randomy: function() {
    return Math.random() * (-400)
  },

  kill: function() {
    this.speed = 0;
  }

};
