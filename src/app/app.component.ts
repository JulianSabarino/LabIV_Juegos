import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tp_sabarino';

  rooter = inject(Router);

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
  }
}
