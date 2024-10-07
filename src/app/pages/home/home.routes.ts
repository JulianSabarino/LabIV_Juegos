import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '',
    loadComponent: ()=> import('../home/home.component').then(m=>m.HomeComponent)
},
{
    path: 'who-we-are',
    loadComponent: ()=> import('../home/who-we-are/who-we-are.component').then(m=>m.WhoWeAreComponent)
},
{
    path: 'games',
    loadComponent: ()=> import('../home/games/games.component').then(m=>m.GamesComponent)
},


];
