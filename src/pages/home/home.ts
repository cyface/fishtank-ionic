import {Component} from '@angular/core';
import {Game} from "../../game/game";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(game: Game) {
  }
}
