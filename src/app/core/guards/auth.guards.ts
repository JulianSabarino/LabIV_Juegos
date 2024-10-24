import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const AuthGuard: CanActivateFn = (route, state) => {
  
    const authService = inject(AuthService)
    const root = inject(Router);
  
  return new Promise((resolve)=>{
    
      if(authService.user.email){
        resolve(true)
      }else{
        root.navigate(['home']);
        resolve(false)
      }
    })
  }
    
