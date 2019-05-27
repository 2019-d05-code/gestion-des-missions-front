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
import { ModifiMissionCollaborateurComponent } from './modifi-mission-collaborateur/modifi-mission-collaborateur.component';
import { ManagerValidationComponent } from './manager-validation/manager-validation.component';
import { ManagerGuard } from './manager-validation/manager-guard';
import { PlanningComponent } from './planning/planning.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const routes: Routes = [
    { path: 'connexion', component: AuthComponent },
    { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { path: 'creation-mission', component: CreationMissionComponent, canActivate: [StatutConnecteService] },
    { path: 'erreur', component: ErreurComponent, canActivate: [StatutConnecteService] },
    { path: 'mission', component: AffichageMissionCollaborateurComponent, canActivate: [StatutConnecteService] },
    { path: 'planning', component: PlanningComponent, canActivate: [StatutConnecteService] },

    { path: 'manager', component: ManagerValidationComponent, canActivate: [ManagerGuard]  },
    { path: 'modifcollab/:id', canActivate: [StatutConnecteService],
        component: ModifiMissionCollaborateurComponent
    }

];



@NgModule({
    declarations: [
        AppComponent,
        TechComponent,
        AuthComponent,
        CreationMissionComponent,
        ErreurComponent,
        DateFinValidateurDirective,
        FormatDateValidateurDirective,
        DateDebutValidateurDirective,
        AffichageMissionCollaborateurComponent,
        MenuComponent,
        ModifiMissionCollaborateurComponent,
        ManagerValidationComponent,
        PlanningComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
