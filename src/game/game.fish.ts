import {Phaser} from 'phaser';

/* Bind Fish Chase */
export function bindFishChase() {
  this.game.input.onDown.add(swimToPoint, this);
}

/* Checks to see if the fish has reached its destination */
export function checkFishStop() {
  if (this.game.physics.arcade.distanceToXY(
      this.pufferfish, this.clickX, this.clickY) < 30
    && this.pufferfish.body.velocity.x !== 0
    && this.pufferfish.body.velocity.y !== 0) {
    if (this.pufferfish.body.velocity.x < 0) {
      this.pufferfish.body.velocity.x = -10;
    }
    else {
      this.pufferfish.body.velocity.x = 10;
    }
    this.pufferfish.body.velocity.y = 0;
    this.pufferfish.animations.stop(true, true);
    this.pufferfish.animations.play('swim', 3, true);
  }
  if (this.pufferfish.body.velocity.x > 0) {
    this.pufferfish.scale.x = Math.abs(this.pufferfish.scale.x) * this.configuration.scale_ratio;
  } else if (this.pufferfish.body.velocity.x < 0) {
    this.pufferfish.scale.x = Math.abs(this.pufferfish.scale.x) * -1 * this.configuration.scale_ratio;
  }
}

/* Creates the fish */
export function createFish() {
  console.log("createFish");
  this.fishLayer = this.game.add.group();
  this.pufferfish = this.game.add.sprite(660, 50, 'puff');

  this.pufferfish.anchor.setTo(.5, .5);
  this.pufferfish.scale.x = -.25  * this.configuration.scale_ratio;
  this.pufferfish.scale.y = .25  * this.configuration.scale_ratio;

  this.pufferfish.animations.add('swim');

  this.game.physics.enable(this.pufferfish, Phaser.Physics.ARCADE);
  this.pufferfish.body.collideWorldBounds = true;
  this.pufferfish.body.bounce.setTo(.2, .2);

  this.pufferfish.animations.play('swim', 3, true);
  this.pufferfish.body.velocity.setTo(-50, 30);
}

/* Makes the fish grow */
export function growFish(growthFactor) {
  console.log("growFish");
  if (this.pufferfish.scale.x < 0) {
    growthFactor *= -1;
  }
  growthFactor *= this.configuration.scale_ratio;

  this.game.add.tween(this.pufferfish.scale).to({x: growthFactor , y: Math.abs(growthFactor)}, 600, Phaser.Easing.Back.Out, true);
  if (this.shrinkTimer) {
    this.game.time.events.remove(this.shrinkTimer);
  }
  this.shrinkTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, shrinkFish, this);
}

/* Shrinks the fish to normal size */
export function shrinkFish() {
  console.log("shrinkFish");
  let newScale = .25 * this.configuration.scale_ratio;
  if (this.pufferfish.scale.x < 0) {
    newScale *= -1  * this.configuration.scale_ratio;
  }
  this.game.add.tween(this.pufferfish.scale).to({x: newScale, y: Math.abs(newScale)}, 600, Phaser.Easing.Linear.None, true);
}

export function swimToPoint(pointer) {
  this.clickX = pointer.x;
  this.clickY = pointer.y;
  this.pufferfish.animations.stop(true, true);
  this.pufferfish.animations.play('swim', 10, true);
  this.game.physics.arcade.moveToXY(this.pufferfish, pointer.x, pointer.y, 200);
}
