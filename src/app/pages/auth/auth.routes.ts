import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '',
    loadComponent: ()=> import('./auth.component').then(m=>m.AuthComponent)
},
{
    path: 'register',
    loadComponent: ()=> import('./register/register.component').then(m=>m.RegisterComponent)
},
{
    path: 'recover',
    loadComponent: ()=> import('./recoverpsw/recoverpsw.component').then(m=>m.RecoverpswComponent)
},

];
