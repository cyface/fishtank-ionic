/* Load Assets */
import {Phaser} from 'phaser';

export function loadAssets() {
  console.log("loadAssets");

  this.game.load.atlasXML('fish', 'assets/imgs/sprites/fish/fishSpritesheet@2.png', 'assets/imgs/sprites/fish/fishSpritesheet@2.xml', Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

  this.game.load.spritesheet('puff', 'assets/imgs/sprites/fish/pufferSheet.png', 236, 229, 2);
  this.game.load.image('bubble-small', 'assets/imgs/sprites/bubble-small.svg');
  this.game.load.image('bubble-large', 'assets/imgs/sprites/bubble-large.svg');
  this.game.load.image('bubble-wobble', 'assets/imgs/sprites/bubble-wobble.svg');

  this.game.load.image('undersea', 'assets/imgs/undersea.jpg');
  this.game.load.image('coral', 'assets/imgs/seabed.png');
  this.game.load.image('coral-front', 'assets/imgs/seabed-front.png');

  this.game.load.image('sunbeams', 'assets/imgs/sunbeams.png');
}
