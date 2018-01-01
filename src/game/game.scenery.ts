export function createBackground() {
  this.game.stage.backgroundColor = "#4488AA";
  this.game.coralBackLayer = this.game.add.group();
  let coralBackLayer = this.game.add.image(0, 0, 'coral');
  coralBackLayer.width = this.configuration.canvas_width;
  coralBackLayer.scale.y = coralBackLayer.scale.x;
  coralBackLayer.y = this.configuration.canvas_height - coralBackLayer.height;
}

export function createForeground() {
  this.coralFrontLayer = this.game.add.group();
  let coralFrontLayer = this.game.add.image(0, 0, 'coral-front');
  coralFrontLayer.width = this.configuration.canvas_width;
  coralFrontLayer.scale.y = coralFrontLayer.scale.x;
  coralFrontLayer.y = this.configuration.canvas_height - coralFrontLayer.height;
}

export function createWater() {
  this.waterLayer = this.game.add.group();
  let undersea = this.game.add.image(0, 0, 'undersea');
  undersea.height = this.configuration.canvas_height;
  undersea.width = this.configuration.canvas_width;
  this.game.scale.refresh();
}

export function createSunbeams() {
  this.sunbeamLayer = this.game.add.group();
  let undersea = this.game.add.image(0, 0, 'sunbeams');
  undersea.height = this.configuration.canvas_height;
  undersea.width = this.configuration.canvas_width;
  this.game.scale.refresh();
}
