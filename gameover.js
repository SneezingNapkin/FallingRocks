function GameOver () {
  console.log('Created a Game Over screen')
  this.width = GAMEWIDTH - 50;
  this.height = GAMEHEIGHT - 50;
  this.shape = new createjs.Shape();
  this.text = new createjs.Text("GAME OVER", "100px Arial", "black");

  var g = this.shape.graphics;

  //square drawing
  // g.setStrokeStyle(1, 'round', 'round');
  g.beginFill("rgba(255,255,255,0.5)");
  g.drawRect(0, 0, this.width, this.height);

  this.position = {
    x: GAMEWIDTH/2 - this.width/2,
    y: GAMEHEIGHT/2 - this.height/2
  }

  stage.addChild(this.shape);
  stage.addChild(this.text);

  this.shape.x = this.position.x;
  this.shape.y = this.position.y;

  this.text.x = GAMEWIDTH/2;
  this.text.y = GAMEHEIGHT/2 - 50;
  this.text.textAlign = 'center';

  //creating the restart button:
  this.button = document.createElement("button");
  //placing the button onto the screen (adding it to the index body):
  document.getElementById('container').appendChild(this.button);
  this.button.textContent = 'Restart';
  BUTTONWIDTH = 100
  this.button.style.width = BUTTONWIDTH + 'px';
  this.button.style.top = GAMEHEIGHT / 2 + 100 + 'px';
  this.button.style.left = GAMEWIDTH / 2 - (BUTTONWIDTH/2) + 'px';

  this.button.addEventListener("click", createnewgame);
}

GameOver.prototype = {
  kill: function () {
    document.getElementById('container').removeChild(this.button);
  }
}
