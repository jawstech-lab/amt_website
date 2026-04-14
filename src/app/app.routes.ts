import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { MuralComponent } from './pages/mural/mural.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { LocalTreinoComponent } from './pages/local-treino/local-treino.component';
import { ApostilaComponent } from './pages/apostila/apostila.component'; 

import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'equipe', component: EquipeComponent },
    { path: 'local', component: LocalTreinoComponent },
    
    { 
      path: 'mural', 
      component: MuralComponent, 
      canActivate: [authGuard] 
    },
    { 
      path: 'apostila', 
      component: ApostilaComponent, 
      canActivate: [authGuard] 
    } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }