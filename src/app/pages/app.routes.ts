import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
},
{
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.routes').then(m=>m.routes)
},
{
    path: 'home',
    loadChildren: ()=> import('./home/home.routes').then(m=>m.routes)
}

];
