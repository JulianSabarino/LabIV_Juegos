import { Component } from '@angular/core';
import { TicTacToeComponent } from '../../../components/tic-tac-toe/tic-tac-toe.component';
import { HangedmanComponent } from '../../../components/hangedman/hangedman.component';
import { FlappybeeComponent } from '../../../components/flappybee/flappybee.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [TicTacToeComponent,HangedmanComponent,FlappybeeComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
