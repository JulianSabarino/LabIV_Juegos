import { Component } from '@angular/core';
import { TicTacToeComponent } from '../../../components/tic-tac-toe/tic-tac-toe.component';
import { HangedmanComponent } from '../../../components/hangedman/hangedman.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [TicTacToeComponent,HangedmanComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
