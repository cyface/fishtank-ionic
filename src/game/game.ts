import {Injectable} from '@angular/core';
import {Phaser} from 'phaser';
import {loadAssets} from './game.assets';
import {createBackground, createForeground, createWater} from "./game.scenery";
import {checkBubbleCollisions, createBubbles} from "./game.bubbles";
import {bindFishChase, checkFishStop, createFish} from "./game.fish";

/*
  The Game
*/
@Injectable()
export class Game {
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'fishtank-phaser', {preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this)});
    //this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'fishtank-phaser', {preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this)});
  }

  preload() {
    console.log("preload");
    loadAssets.call(this);
  }

  create() {
    console.log("create");
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    createWater.call(this);
    createBackground.call(this);
    createBubbles.call(this);
    createFish.call(this);
    createForeground.call(this);
    bindFishChase.call(this);
  }

  update() {
    checkBubbleCollisions.call(this);
    checkFishStop.call(this);
  }

}
