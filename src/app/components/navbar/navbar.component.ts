import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  rooter = inject(Router);
  authService = inject(AuthService);
  logo = "/assets/logo.png"; 

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
  }

}
