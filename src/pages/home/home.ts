import {Component} from '@angular/core';
import {Phaser} from 'phaser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  game: Phaser.Game;
  private bubbleLarge: Phaser.Sprite;
  private bubbleSmall: Phaser.Sprite;
  private bubbleWobble: Phaser.Sprite;
  private pufferfish: Phaser.Sprite;


  constructor() {
    this.game = new Phaser.Game(800, 400, Phaser.AUTO, 'fishtank-phaser', {preload: this.preload, create: this.create, update: this.update});
    this.game.shrinkFish = this.shrinkFish;
    this.game.catchBubble = this.catchBubble;
  }

  preload() {
    this.game.load.atlasXML('fish', 'assets/imgs/sprites/fish/fishSpritesheet@2.png', 'assets/imgs/sprites/fish/fishSpritesheet@2.xml', Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

    this.game.load.spritesheet('puff', 'assets/imgs/sprites/fish/pufferSheet.svg', 58, 57, 2);
    this.game.load.image('bubble-small', 'assets/imgs/sprites/bubble-small.svg');
    this.game.load.image('bubble-large', 'assets/imgs/sprites/bubble-large.svg');
    this.game.load.image('bubble-wobble', 'assets/imgs/sprites/bubble-wobble.svg');

    this.game.load.image('undersea', 'assets/imgs/undersea.jpg');
    this.game.load.image('coral', 'assets/imgs/seabed.png');
    this.game.load.image('coral-front', 'assets/imgs/seabed-front.png');
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.game.waterLayer = this.game.add.group();
    this.game.add.image(0, 0, 'undersea');

    this.game.bubbleLayer = this.game.add.group();
    this.game.bubbleSmall = this.game.add.sprite(Math.random() * 600, 360, 'bubble-small');
    this.game.bubbleLarge = this.game.add.sprite(Math.random() * 600, 360, 'bubble-large');
    this.game.bubbleWobble = this.game.add.sprite(Math.random() * 600, 360, 'bubble-wobble');
    this.game.physics.enable(this.game.bubbleSmall, Phaser.Physics.ARCADE);
    this.game.physics.enable(this.game.bubbleLarge, Phaser.Physics.ARCADE);
    this.game.physics.enable(this.game.bubbleWobble, Phaser.Physics.ARCADE);
    this.game.bubbleSmall.body.velocity.setTo(0, -30);

    this.game.coralLayer = this.game.add.group();
    this.game.add.image(0, 266, 'coral');

    this.game.fishLayer = this.game.add.group();
    this.game.pufferfish = this.game.add.sprite(660, 50, 'puff');

    this.game.coralFrontLayer = this.game.add.group();
    this.game.add.image(0, 333, 'coral-front');

    this.game.pufferfish.anchor.setTo(.5, .5);
    this.game.pufferfish.scale.x *= -1;

    this.game.pufferfish.animations.add('swim');

    this.game.physics.enable(this.game.pufferfish, Phaser.Physics.ARCADE);
    this.game.pufferfish.body.collideWorldBounds = true;
    this.game.pufferfish.body.bounce.setTo(.2, .2);
    this.game.pufferfish.animations.play('swim', 3, true);
    this.game.pufferfish.body.velocity.setTo(-50, 30);

    this.game.input.onDown.add(function (pointer) {
      this.clickX = pointer.x;
      this.clickY = pointer.y;
      this.game.pufferfish.animations.stop(true, true);
      this.game.pufferfish.animations.play('swim', 10, true);
      this.game.physics.arcade.moveToXY(this.game.pufferfish, pointer.x, pointer.y, 200);
    }, this);
  }

  update() {
    if (this.game.physics.arcade.collide(this.game.bubbleSmall, this.game.pufferfish) || this.game.bubbleSmall.y < 20) {
      this.game.catchBubble(this.game.bubbleSmall, 'small');
    }

    if (this.game.physics.arcade.collide(this.game.bubbleLarge, this.game.pufferfish) || this.game.bubbleLarge.y < 20) {
      this.game.catchBubble(this.game.bubbleLarge, 'large');
    }

    if (this.game.physics.arcade.collide(this.game.bubbleWobble, this.game.pufferfish) || this.game.bubbleWobble.y < 20) {
      this.game.catchBubble(this.game.bubbleWobble, 'wobble');
    }

    if (this.game.physics.arcade.distanceToXY(this.game.pufferfish, this.game.clickX, this.game.clickY) < 30 && this.game.pufferfish.body.velocity.x !== 0 && this.game.pufferfish.body.velocity.y !== 0) {
      if (this.game.pufferfish.body.velocity.x < 0) {
        this.game.pufferfish.body.velocity.x = -10;
      }
      else {
        this.game.pufferfish.body.velocity.x = 10;
      }
      this.game.pufferfish.body.velocity.y = 0;
      this.game.pufferfish.animations.stop(true, true);
      this.game.pufferfish.animations.play('swim', 3, true);
    }
    if (this.game.pufferfish.body.velocity.x > 0) {
      this.game.pufferfish.scale.x = Math.abs(this.game.pufferfish.scale.x);
    } else if (this.game.pufferfish.body.velocity.x < 0) {
      this.game.pufferfish.scale.x = Math.abs(this.game.pufferfish.scale.x) * -1;
    }
  }

  catchBubble(bubble:Phaser.Sprite, size:string) {
    bubble.kill();

    let newSize = 1.5;
    let nextBubble = this.bubbleLarge;

    if (size === 'large') {
      newSize = 2;
      nextBubble = this.bubbleWobble;
    }
    if (size === 'wobble') {
      newSize = 3;
      nextBubble = this.bubbleSmall;
    }
    if (this.pufferfish.scale.x < 0) {
      newSize = -1.5;
    }

    if (bubble.x > 20) {
      this.add.tween(this.pufferfish.scale).to({x: newSize, y: Math.abs(newSize)}, 600, Phaser.Easing.Back.Out, true);
      this.time.events.add(Phaser.Timer.SECOND * 4, this.shrinkFish, this);
    }
    nextBubble.x = Math.random() * 600;
    nextBubble.y = 360;
    nextBubble.revive();
    nextBubble.body.velocity.setTo(0, -30);
    this.add.tween(nextBubble.scale).from({x: .01, y: .01}, 8000, Phaser.Easing.Linear.None, true);
  }

  shrinkFish() {
    let newSize = 1;
    if (this.pufferfish.scale.x < 0) {
      newSize = -1;
    }
    this.add.tween(this.pufferfish.scale).to({x: newSize, y: 1}, 600, Phaser.Easing.Linear.None, true);
  }



}
