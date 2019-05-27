import { Component, OnInit } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { addYears, subYears, startOfDay, endOfDay } from 'date-fns';
import { DataService } from '../services/data.service';
import { MissionManager } from '../modeles/Mission';
import { CollConn } from '../modeles/Collaborateur';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const colors: any = {
    green: { primary: '#008000', secondary: '#00cc00' },
    blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
    yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: ['./planning.componant.css'],
    providers: [ { provide: CalendarDateFormatter, useClass: CustomDateFormatter } ]
})
export class PlanningComponent implements OnInit {
    // - attribut foncrionnel -
    listeMission: MissionManager[];
    connecte: CollConn;

    // - attribut calendrier -
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;
    refresh: Subject<any> = new Subject();
    locale = 'fr';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

    constructor(private _serv: DataService, private _authSrv: AuthService)
    {
        // recuperation du collegue connecte
        this._authSrv.recupererCollConn().subscribe(
            (valeurObtenue) => { this.connecte = valeurObtenue; },
            error => { alert(`${error.name} : ${error.message}`); },
            () => { });
    }

    ngOnInit() {
        // recuperation de la liste des missions du collegue
        this._serv.recupererMissionCollegue(this.connecte.email) //this.connecte.email
            /*.subscribe(coll => { this.listeMission = coll; },
                (error: Error) => { alert(`${error.name} : ${error.message}`); });*/
            .pipe( map(
            liste => liste.map(mission => {
                let couleur = colors.yellow;
                if (mission.nature === 'Congé')
                { couleur = colors.red; }
                else {couleur = colors.blue; }

                // ajout des evenement dans le calendrier
                return <CalendarEvent>{
                    start: startOfDay(mission.dateDebut),
                    end: endOfDay(mission.dateFin),
                    title: `${mission.nature}`,
                    color: couleur,
                };
           })
            ));


}


setView(view: CalendarView) {
    this.view = view;
}

closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
}

anneeSuivante() {
    this.viewDate = addYears(this.viewDate, 1);
}

anneePrecedente() {
    this.viewDate = subYears(this.viewDate, 1);
}

}

