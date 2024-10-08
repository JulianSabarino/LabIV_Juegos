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
{
    path: 'tic-tac-toe',
    loadComponent: ()=> import('../../components/tic-tac-toe/tic-tac-toe.component').then(m=>m.TicTacToeComponent)
},
{
    path: 'hangedman',
    loadComponent: ()=> import('../../components/hangedman/hangedman.component').then(m=>m.HangedmanComponent )
},
{
    path: 'askedmtg',
    loadComponent: ()=> import('../../components/askmagic/askmagic.component').then(m=>m.AskmagicComponent )
}
    
];
