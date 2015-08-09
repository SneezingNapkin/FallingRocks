function Rock () {

  console.log('Created a rock')

  this.bitmap = new createjs.Bitmap(art.rock);
  this.bitmap.scaleX = 0.5;
  this.bitmap.scaleY = 0.5;


  this.position = {
    y: this.randomy(),
    x: this.randomx()
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
  height: 50,
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

  // We want the rocks to fall in specific columns rather than randomly accross the screen:
  randomx: function() {
    return (Math.floor((Math.random() * 16 * 60) / 60)) * 60;
  },

  // Logic behind the above equation but doing it with 50 width:
  // canvas width = 960
  // width of rocks = 50
  //
  // how many columns?
  // canvas width / width of rocks
  // 960 / 50 = 19.2
  // Rouneded down this makes 19 columns
  //
  // Columns start at pixel:
  // | 0 | 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500 | 550 | 600 | 650 | 700 | 750 | 800 | 850 | 900 | 950 |
  //
  // Column number:
  // | 1 | 2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  10 |  11 |  12 |  13 |  14 |  15 |  16 |  17 |  18 |  19 |left over|
  //
  // Math.random() gives a number between 0 and 1
  //
  // Multiply that number by 19
  //
  // Multiple the result by 50
  //
  // Tests:
  // 0.49 * 19 * 50 = 465.5
  //
  // We want this result to be equal to the column starting positions.
  //
  // Divide the result by 50
  //
  // 465.5 / 50 = 9.31
  //
  // Round down:
  //
  // 9.31 -> 9
  //
  // Multiply by 50:
  //
  // 450



  randomy: function() {
    return Math.random() * (-400)
  },

  kill: function() {
    this.speed = 0;
  }

};
