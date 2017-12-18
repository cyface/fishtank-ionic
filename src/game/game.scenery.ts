export function createBackground() {
  this.game.coralBackLayer = this.game.add.group();
  this.game.add.image(0, 266, 'coral');
}

export function createForeground() {
  this.coralFrontLayer = this.game.add.group();
  this.game.add.image(0, 333, 'coral-front');
}

export function createWater() {
  this.waterLayer = this.game.add.group();
  this.game.add.image(0, 0, 'undersea');
}
