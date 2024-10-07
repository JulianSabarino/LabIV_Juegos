import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, user } from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  logo = "/assets/logo.png"; 
  
  rooter = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.email]),
    pass: new FormControl('', [Validators.required])});

  submit()
  {
    console.log(this.form.value.email);

    let user =
    {
      email: this.form.value.email,
      pass: this.form.value.pass
    }

    createUserWithEmailAndPassword(getAuth(), user.email as string,user.pass as string).then(() => {
      this.RootPath('home');
    }).catch
    (error => {
      console.log(error);
    })
  }

  RootPath(path:string)
  {
  
    this.rooter.navigate([path]);
  }
}
