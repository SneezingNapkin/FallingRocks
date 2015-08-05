function CollisionManager () {

}

CollisionManager.prototype = {

  //these are properties:
  collisiondetected: false,
  nearcollisiondetection: false,

  //these are methods:
  checkIntersection: function(rock, person) {
    if (rock.position.x >= person.position.x + person.width ||
        rock.position.x + rock.width <= person.position.x ||
        rock.position.y >= person.position.y + person.height/4 ||
        rock.position.y + rock.height <= person.position.y) {
          return false;
        }
    else {
      return true;
    }
  },

  checknearby: function(rock, person) {
    var ROCKAURA = 200;

    if (rock.position.x >= person.position.x + person.width ||
        rock.position.x + rock.width <= person.position.x ||
        rock.position.y + rock.height + ROCKAURA <= person.position.y) {
          return false;
        }
    else {
      return true;
    }
  },
  update: function(rocks, person) {
    this.nearcollisiondetection = false;

    for (i = 0; i < rocks.length; i++) {
      if (this.checknearby(rocks[i], person)) {
        this.nearcollisiondetection = true;

        if (this.checkIntersection(rocks[i], person)) {
          console.log("Game Over");
          this.collisiondetected = true;
        }
          //this breaks out of a for loop:
        break;
      }
    }
  }
}
