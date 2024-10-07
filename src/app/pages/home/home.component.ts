import { Component, inject } from '@angular/core';
import { TicTacToeComponent } from '../../components/tic-tac-toe/tic-tac-toe.component';
import { HangedmanComponent } from '../../components/hangedman/hangedman.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicTacToeComponent,HangedmanComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  rooter = inject(Router);

  js_photo = "/assets/js_photo.jpg"; 
  placeholder = "/assets/placeholder.jpg"; 

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
  }
}
