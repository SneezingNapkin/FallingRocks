function UI () {
  this.counter = new createjs.Text(0, "20px Arial", "white");
  this.count = 0;
  this.position = {
    x: GAMEWIDTH/2 - this.width/2,
    y: GAMEHEIGHT/2 - this.height/2
  }

  stage.addChild(this.counter);

  this.counter.x = GAMEWIDTH-10;
  this.counter.y = 10;
  this.counter.textAlign = 'right';
}

UI.prototype = {

  update: function(e) {
    this.count = parseInt(this.count) + Math.round(e.delta);
    this.counter.text = Math.round(this.count/1000);
  }
}
