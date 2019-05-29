import { AccueilComponent } from './accueil/accueil.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AffichageMissionCollaborateurComponent } from './affichage-mission-collaborateur/affichage-mission-collaborateur.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CreationMissionComponent } from './creation-mission/creation-mission.component';
import { DateDebutValidateurDirective } from './validateurs/date-debut-validateur.directive';
import { DateFinValidateurDirective } from './validateurs/date-fin-validateur.directive';
import { FormatDateValidateurDirective } from './validateurs/format-date-validateur.directive';
import { FormsModule } from '@angular/forms';
import { GestionNoteFraisComponent } from './gestion-note-frais/gestion-note-frais.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ManagerGuard } from './manager-validation/manager-guard';
import { ManagerValidationComponent } from './manager-validation/manager-validation.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MenuComponent } from './menu/menu.component';
import { ModifierMissionCollaborateurComponent } from './modifier-mission-collaborateur/modifier-mission-collaborateur.component';
import { PlanningComponent } from './planning/planning.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaisieNoteFraisComponent } from './gestion-note-frais/saisie-note-frais.component';
import { StatutConnecteService } from './auth/statut-connecte.service';

const routes: Routes = [
    { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService] },
    { path: 'connexion', component: AuthComponent },
    { path: 'creation-mission', component: CreationMissionComponent, canActivate: [StatutConnecteService] },
    { path: 'noteDeFrais', component: GestionNoteFraisComponent, canActivate: [StatutConnecteService] },
    { path: 'noteDeFrais/:missionId', component: SaisieNoteFraisComponent, canActivate: [StatutConnecteService] },
    { path: 'manager', component: ManagerValidationComponent, canActivate: [ManagerGuard] },
    { path: 'mission', component: AffichageMissionCollaborateurComponent, canActivate: [StatutConnecteService] },
    { path: 'modifcollab/:id', component: ModifierMissionCollaborateurComponent, canActivate: [StatutConnecteService] },
    { path: 'planning', component: PlanningComponent, canActivate: [StatutConnecteService] },
    { path: '**', redirectTo: '/connexion', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        AccueilComponent,
        AffichageMissionCollaborateurComponent,
        AppComponent,
        AuthComponent,
        CreationMissionComponent,
        DateDebutValidateurDirective,
        DateFinValidateurDirective,
        FormatDateValidateurDirective,
        GestionNoteFraisComponent,
        ManagerValidationComponent,
        MenuComponent,
        ModifierMissionCollaborateurComponent,
        PlanningComponent,
        SaisieNoteFraisComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FormsModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
