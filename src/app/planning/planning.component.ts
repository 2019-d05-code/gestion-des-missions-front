import { Component, OnInit } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: []
})
export class PlanningComponent implements OnInit {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();

    constructor() { }

    ngOnInit() { }

    locale = 'fr';
	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
    //CalendarView = CalendarView;


    setView(view: CalendarView) {
        this.view = view;
      }

      /*closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
      }*/





}
