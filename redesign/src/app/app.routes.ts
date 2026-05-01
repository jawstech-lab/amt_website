import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MuralComponent } from './pages/mural/mural.component';
import { ApostilaComponent } from './pages/apostila/apostila.component'; 

import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    
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