import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../../../core/services/games.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit{
  gameService = inject(GamesService)
  spinner = inject(NgxSpinnerService)


  async ngOnInit() {
    this.spinner.show()
    await this.gameService.getAllAsked()
    await this.gameService.getAllHangedMan()
    await this.gameService.getAllMinMax();
    await this.gameService.getAllTicTacToe();
    await this.gameService.getAllBoar();
    this.spinner.hide()
}

}
