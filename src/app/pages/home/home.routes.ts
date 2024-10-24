import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guards';

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
    path: 'tic-tac-toe',
    loadComponent: ()=> import('../../components/tic-tac-toe/tic-tac-toe.component').then(m=>m.TicTacToeComponent),canActivate:[AuthGuard]
},
{
    path: 'hangedman',
    loadComponent: ()=> import('../../components/hangedman/hangedman.component').then(m=>m.HangedmanComponent ),canActivate:[AuthGuard]
},
{
    path: 'askedmtg',
    loadComponent: ()=> import('../../components/askmagic/askmagic.component').then(m=>m.AskmagicComponent ),canActivate:[AuthGuard]
},
{
    path: 'rpg',
    loadComponent: ()=> import('../../components/rolgame/rolgame.component').then(m=>m.RolgameComponent ),canActivate:[AuthGuard]
},
{
    path: 'minmax',
    loadComponent: ()=> import('../../components/minmax/minmax.component').then(m=>m.MinmaxComponent ),canActivate:[AuthGuard]
},
{
    path: 'chat',
    loadComponent: ()=> import('../../components/chat/chat.component').then(m=>m.ChatComponent )
}
,
{
    path: 'score',
    loadComponent: ()=> import('../../pages/home/scores/scores.component').then(m=>m.ScoresComponent )
}
    
];
