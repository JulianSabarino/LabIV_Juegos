import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../../../core/services/games.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit{
  gameService = inject(GamesService)


  ngOnInit(): void {
    this.gameService.getAllAsked()
    this.gameService.getAllHangedMan()
    this.gameService.getAllMinMax();
    this.gameService.getAllTicTacToe();
}

}
