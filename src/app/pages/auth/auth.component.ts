import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  logo = "/assets/logo.png"; 
  
  rooter = inject(Router);
  authService  = inject(AuthService);
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
  }

  async login()
  {
    await this.authService.login(this.form.value.email!,this.form.value.password!);
    if(this.authService.user)
    {
      this.RootPath('home');
    }
    else
    {
      console.log("error");
    }
    
  }

  FillForm()
  {
    this.form.value.email="julian3331arg@gmail.com";
    this.form.value.password="654321";
  }

}
