/* Bubbles */

import {Phaser} from 'phaser';
import {growFish} from "./game.fish";

export function catchBubble(bubble: Phaser.Sprite, size: string) {
  bubble.kill();

  let newSize = .4;

  if (size === 'large') {
    newSize = .6;
  }
  if (size === 'wobble') {
    newSize = .75;
  }

  growFish.call(this, newSize);
}

export function createBubbles() {
  this.bubbleLayer = this.game.add.group();
  this.bubbleSmall = this.game.add.sprite(Math.random() * 600, 400, 'bubble-small');
  this.bubbleLarge = this.game.add.sprite(Math.random() * 600, 400, 'bubble-large');
  this.bubbleWobble = this.game.add.sprite(Math.random() * 600, 400, 'bubble-wobble');
  this.game.physics.enable(this.bubbleSmall, Phaser.Physics.ARCADE);
  this.game.physics.enable(this.bubbleLarge, Phaser.Physics.ARCADE);
  this.game.physics.enable(this.bubbleWobble, Phaser.Physics.ARCADE);
  this.bubbleSmall.checkWorldBounds = true;
  this.bubbleLarge.checkWorldBounds = true;
  this.bubbleWobble.checkWorldBounds = true;
  this.bubbleSmall.outOfBoundsKill = true;
  this.bubbleLarge.outOfBoundsKill = true;
  this.bubbleWobble.outOfBoundsKill = true;
  this.bubbleSmall.events.onKilled.add(showNextBubble.bind(this, this.bubbleLarge));
  this.bubbleLarge.events.onKilled.add(showNextBubble.bind(this, this.bubbleWobble));
  this.bubbleWobble.events.onKilled.add(showNextBubble.bind(this, this.bubbleSmall));

  showNextBubble.call(this, this.bubbleSmall);
}

export function checkBubbleCollisions() {
  if (this.game.physics.arcade.collide(this.bubbleSmall, this.pufferfish)) {
    catchBubble.call(this, this.bubbleSmall, 'small');
  }

  if (this.game.physics.arcade.collide(this.bubbleLarge, this.pufferfish)) {
    catchBubble.call(this, this.bubbleLarge, 'large');
  }

  if (this.game.physics.arcade.collide(this.bubbleWobble, this.pufferfish)) {
    catchBubble.call(this, this.bubbleWobble, 'wobble');
  }
}

export function showNextBubble(nextBubble) {
  nextBubble.x = Math.random() * 600;
  nextBubble.y = 400;
  nextBubble.revive();
  nextBubble.body.velocity.setTo(0, -30);
  this.game.add.tween(nextBubble.scale).from({x: .01, y: .01}, 8000, Phaser.Easing.Linear.None, true);
}
