import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
<<<<<<< HEAD
=======

>>>>>>> master
import { FormsModule } from '@angular/forms';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CreationMissionComponent } from './creation-mission/creation-mission.component';
<<<<<<< HEAD
import { ConnexionComponent } from './connexion/connexion.component';
import { ErreurComponent } from './erreur/erreur.component';
=======
import { AffichageMissionCollaborateurComponent } from './affichage-mission-collaborateur/affichage-mission-collaborateur.component';
import { MenuComponent } from './menu/menu.component';
>>>>>>> master

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent },
<<<<<<< HEAD
  { path: 'creation-mission', component: CreationMissionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: '/tech', pathMatch: 'full' },
=======
  { path: '', component: CreationMissionComponent },
  { path: 'mission/affichage', component: AffichageMissionCollaborateurComponent }
 // { path: '', redirectTo: '/tech', pathMatch: 'full' },
>>>>>>> master
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    CreationMissionComponent,
<<<<<<< HEAD
    ConnexionComponent,
    ErreurComponent
=======
    AffichageMissionCollaborateurComponent,
    MenuComponent

>>>>>>> master
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
