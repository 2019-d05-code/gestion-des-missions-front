import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ErreurComponent } from './erreur/erreur.component';
import { AffichageMissionCollaborateurComponent } from './affichage-mission-collaborateur/affichage-mission-collaborateur.component';
import { MenuComponent } from './menu/menu.component';
import { ModifierMissionCollaborateurComponent } from './modifier-mission-collaborateur/modifier-mission-collaborateur.component';
import { ManagerValidationComponent } from './manager-validation/manager-validation.component';
import { ManagerGuard } from './manager-validation/manager-guard';
import { PlanningComponent } from './planning/planning.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionNoteFraisComponent } from './gestion-note-frais/gestion-note-frais.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { SaisieNoteFraisComponent } from './gestion-note-frais/saisie-note-frais.component';

const routes: Routes = [
    { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService] },
    { path: 'connexion', component: AuthComponent },
    { path: 'creation-mission', component: CreationMissionComponent, canActivate: [StatutConnecteService] },
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { path: 'erreur', component: ErreurComponent, canActivate: [StatutConnecteService] },
    { path: 'frais', component: GestionNoteFraisComponent, canActivate: [StatutConnecteService] },
    { path: 'frais/:missionId', component: SaisieNoteFraisComponent, canActivate: [StatutConnecteService] },
    { path: 'manager', component: ManagerValidationComponent, canActivate: [ManagerGuard] },
    { path: 'mission', component: AffichageMissionCollaborateurComponent, canActivate: [StatutConnecteService] },
    { path: 'modifcollab/:id', component: ModifierMissionCollaborateurComponent, canActivate: [StatutConnecteService] },
    { path: 'planning', component: PlanningComponent, canActivate: [StatutConnecteService] },
    { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
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
        ErreurComponent,
        FormatDateValidateurDirective,
        GestionNoteFraisComponent,
        ManagerValidationComponent,
        MenuComponent,
        ModifierMissionCollaborateurComponent,
        PlanningComponent,
        SaisieNoteFraisComponent,
        TechComponent,
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
