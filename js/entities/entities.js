game.PlayerEntity = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(8, 8);

        this.vel.x += this.accel.x * me.timer.tick;

        this.currentTile = this.posToTile(this.pos);
        this.previousTile = this.posToTile(this.pos);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    posToTile: function(pos) {
                 console.log("posToTile " + pos.x + ", " + pos.y);
      return {x: ~~(pos.x / 32), y: ~~(pos.y / 32)};
    },

    trailingPos: function() {
      return {x: this.pos.x+this.hWidth, y: this.pos.y+this.hHeight};
    },

    update: function() {
        var can_lr = (this.pos.y % 32) == 0;
        var can_ud = (this.pos.x % 32) == 0;

        if (me.input.isKeyPressed('left') && can_lr) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
            this.vel.y = 0; 
        } else if (me.input.isKeyPressed('right') && can_lr) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
            this.vel.y = 0; 
        }
        if (me.input.isKeyPressed('up') && can_ud) {
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
            this.vel.x = 0; 
        } else if (me.input.isKeyPressed('down') && can_ud) {
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
            this.vel.x = 0; 
        }

        // check & update player movement
        this.updateMovement();
        var res = me.game.collide(this);
        if (res && res.type == "strand") {
          this.vel.x=0;
          this.vel.y=0;
          this.renderable.flicker(40);
          this.parent();
          return true;
        }
        if (this.vel.x > 0) {
          this.currentTile = this.posToTile(this.pos);
        } else if (this.vel.x < 0) {
          this.currentTile = this.posToTile(this.trailingPos());
        } else if (this.vel.y > 0) {
          this.currentTile = this.posToTile(this.pos);
        } else if (this.vel.y < 0) {
          this.currentTile = this.posToTile(this.trailingPos());
        } else {
          this.currentTile = this.posToTile(this.pos);
        }

        console.log("currentTile " + this.currentTile.x + ", " + this.currentTile.y + " previousTile " + this.previousTile.x + ", " + this.previousTile.y);
        if (this.currentTile.x != this.previousTile.x) {
          var strand = new game.StrandEntity(this.previousTile.x, this.previousTile.y, {image: "strand", spritewidth: 32});
          me.game.add(strand, this.z);
          this.previousTile = this.currentTile
        } else if (this.currentTile.y != this.previousTile.y) {
          var strand = new game.StrandEntity(this.previousTile.x, this.previousTile.y, {image: "strand", spritewidth: 32});
          me.game.add(strand, this.z);
          this.previousTile = this.currentTile
        }

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            if (this.vel.x > 0) {
              this
            } else if (this.vel.y > 0 ) {
            }
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
  onCollision: function() {
console.log("collision were occur");
}
});

game.StrandEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x*32, y*32+16, settings);
        this.type = "strand";
        this.name = "strand";
//        settings.image = "missile";
//        settings.spritewidth = 64;
//        this.parent(x, y, settings);
//        this.z = 1;
//        this.gravity = 0;
//        this.collidable = true;
//        this.type = me.game.MISSILE;
    },
    onCollision: function (res, obj) {
//console.log("collided with " + res + " and " + obj);
},
    update: function () {
//        if (!this.visible)
//            return false;
//        var rand = Math.floor(Math.random() * 20)
//        if (rand == 10) {
//            console.log("missile fired a bullet");
//            shot = new enemyBullet(this.pos.x + 20, this.pos.y + 100, {
//                image: 'enemyBullet',
//                spritewidth: 32
//            });
//            me.game.add(shot, this.z);
//            me.game.sort();
//        }
//        this.updateMovement();
//        if (this.vel.x != 0 || this.vel.y != 0) {
//            this.parent(this);
//            return true;
//        }
//        return false;
    },
    onDestroyEvent: function () {}
});
