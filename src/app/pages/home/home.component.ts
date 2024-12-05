import { Component, inject } from '@angular/core';
import { TicTacToeComponent } from '../../components/tic-tac-toe/tic-tac-toe.component';
import { HangedmanComponent } from '../../components/hangedman/hangedman.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SurveyModalComponent } from '../../components/survey-modal/survey-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicTacToeComponent,HangedmanComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  rooter = inject(Router);
  dialog = inject(MatDialog);

  js_photo = "/assets/js_photo.jpg"; 
  placeholder = "/assets/placeholder.jpg"; 

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
  }

  async sendSurvey(game: string)
  {
    const dialogRef = this.dialog.open(SurveyModalComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: true,  // Ensure backdrop is enabled (otherwise, the modal might not display properly)
      data: { game: game } // Pass data to the modal
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {

    });
  }
}
