import {Component} from '@angular/core';
import {Phaser} from 'phaser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clickX: number;
  clickY: number;
  game: Phaser.Game;
  coralLayer: Phaser.Group;
  fishLayer: Phaser.Group;
  waterLayer: Phaser.Group;
  pufferfish: Phaser.Sprite;


  constructor() {
    this.game = new Phaser.Game(800, 400, Phaser.AUTO, 'fishtank-phaser', {preload: this.preload, create: this.create, update: this.update});
  }

  preload() {
    this.game.load.atlasXML('fish', 'assets/imgs/sprites/fish/fishSpritesheet@2.png', 'assets/imgs/sprites/fish/fishSpritesheet@2.xml', Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

    this.game.load.spritesheet('puff', 'assets/imgs/sprites/fish/pufferSheet.svg', 58, 57, 2);

    //  Just a few images to use in our underwater scene
    this.game.load.image('undersea', 'assets/imgs/undersea.jpg');
    this.game.load.image('coral', 'assets/imgs/seabed.png');
    this.game.load.image('coral-front', 'assets/imgs/seabed-front.png');
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.waterLayer = this.game.add.group();
    this.game.add.image(0, 0, 'undersea');
    this.game.add.image(0, 266, 'coral');

    this.fishLayer = this.game.add.group();
    this.pufferfish = this.game.add.sprite(660, 50, 'puff');

    this.coralLayer = this.game.add.group();
    this.game.add.image(0, 333, 'coral-front');

    this.pufferfish.anchor.setTo(.5, .5);
    this.pufferfish.scale.x *= -1;

    this.pufferfish.animations.add('swim');

    this.game.physics.enable(this.pufferfish, Phaser.Physics.ARCADE);
    this.pufferfish.body.collideWorldBounds = true;
    this.pufferfish.body.bounce.setTo(.2, .2);
    this.pufferfish.animations.play('swim', 3, true);
    this.pufferfish.body.velocity.setTo(-50, 30);

    this.game.input.onDown.add(function (pointer) {
      this.clickX = pointer.x;
      this.clickY = pointer.y;
      this.pufferfish.animations.stop(true, true);
      this.pufferfish.animations.play('swim', 10, true);
      this.game.physics.arcade.moveToXY(this.pufferfish, pointer.x, pointer.y, 200);
    }, this);
  }

  update() {
    if (this.game.physics.arcade.distanceToXY(this.pufferfish, this.clickX, this.clickY) < 30 && this.pufferfish.body.velocity.x !== 0 && this.pufferfish.body.velocity.y !== 0) {
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
      this.pufferfish.scale.x = Math.abs(this.pufferfish.scale.x);
    } else if (this.pufferfish.body.velocity.x < 0) {
      this.pufferfish.scale.x = Math.abs(this.pufferfish.scale.x) * -1;
    }
  }

}
