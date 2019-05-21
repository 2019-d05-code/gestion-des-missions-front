import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DateFinValidateurDirective } from './validateurs/date-fin-validateur.directive';
import { FormatDateValidateurDirective } from './validateurs/format-date-validateur.directive';
import { DateDebutValidateurDirective } from './validateurs/date-debut-validateur.directive';
import { CreationMissionComponent } from './creation-mission/creation-mission.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ErreurComponent } from './erreur/erreur.component';
import { AffichageMissionCollaborateurComponent } from './affichage-mission-collaborateur/affichage-mission-collaborateur.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent },
  { path: 'creation-mission', component: CreationMissionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'erreur', component: ErreurComponent },
  { path: '', redirectTo: '/tech', pathMatch: 'full' },
  { path: 'mission/affichage', component: AffichageMissionCollaborateurComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        TechComponent,
        AuthComponent,
        CreationMissionComponent,
        ConnexionComponent,
        ErreurComponent,
        DateFinValidateurDirective,
        FormatDateValidateurDirective,
        DateDebutValidateurDirective,
        AffichageMissionCollaborateurComponent,
        MenuComponent
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
