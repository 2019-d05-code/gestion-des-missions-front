import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appDateDebutValidateur]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateDebutValidateurDirective, multi: true }]
})
export class DateDebutValidateurDirective implements Validator {

    constructor() { }

    validate(control: AbstractControl): ValidationErrors | null {
        const nombreMillisecondesMaintenant = Date.now();
        const dateMaintenant = new Date();
        dateMaintenant.setTime(nombreMillisecondesMaintenant);
        const dateDebutMission = control.value;

        if (dateMaintenant.getTime() > dateDebutMission.getTime()) {
            throw new Error(`La date est antérieure à celle d'aujourd'hui !`);
        }
        else if (dateMaintenant.getDay() <= dateDebutMission.getDay()
            && dateMaintenant.getMonth() < dateDebutMission.getMonth()
            && dateMaintenant.getFullYear() < dateDebutMission.getFullYear()) {
            throw new Error(`Vous n'avez pas le droit d'enregistrer une mission aujourd'hui !`);
        }

        throw null;
    }
}
