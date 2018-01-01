import {Injectable} from '@angular/core';
import {Phaser} from 'phaser';
import {loadAssets} from './game.assets';
import {createBackground, createForeground, createSunbeams, createWater} from "./game.scenery";
import {checkBubbleCollisions, createBubbles} from "./game.bubbles";
import {bindFishChase, checkFishStop, createFish} from "./game.fish";

/*
  The Game
*/
@Injectable()
export class Game {
  game: Phaser.Game;
  configuration = {
    'canvas_width_max': 2048,
    'canvas_width': 1000,
    'canvas_height_max': 2048,
    'canvas_height': 650,
    'scale_ratio': 1,
    'aspect_ratio': 1,
  };

  constructor() {
    this.configuration.canvas_width = window.screen.availWidth * window.devicePixelRatio;
    this.configuration.canvas_height = window.screen.availHeight * window.devicePixelRatio;
    this.configuration.aspect_ratio = this.configuration.canvas_width / this.configuration.canvas_height;
    if (this.configuration.aspect_ratio < 1) this.configuration.scale_ratio = this.configuration.canvas_height / this.configuration.canvas_height_max;
    else this.configuration.scale_ratio = this.configuration.canvas_width / this.configuration.canvas_width_max;

    this.game = new Phaser.Game(this.configuration.canvas_width, this.configuration.canvas_height, Phaser.AUTO, 'fishtank-phaser', {preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this)});
  }

  preload() {
    console.log("preload");
    loadAssets.call(this);
  }

  create() {
    console.log("create");
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    createWater.call(this);
    createBackground.call(this);
    createBubbles.call(this);
    createFish.call(this);
    createForeground.call(this);
    createSunbeams.call(this);
    bindFishChase.call(this);
  }

  update() {
    checkBubbleCollisions.call(this);
    checkFishStop.call(this);
  }

}
