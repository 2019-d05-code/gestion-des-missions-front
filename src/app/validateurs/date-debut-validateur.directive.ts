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
        const dateDebutMission = new Date(control.value);

        if (dateMaintenant.getFullYear() == dateDebutMission.getFullYear()
            && dateMaintenant.getMonth() == dateDebutMission.getMonth()
            && dateMaintenant.getDate() == dateDebutMission.getDate()) {
            return { date: `Vous n'avez pas le droit d'enregistrer une mission aujourd'hui !` };
        }
        else if (dateMaintenant.getTime() > dateDebutMission.getTime()) {
            return { date: `La date est antérieure à celle d'aujourd'hui !` };
        }

        return null;
    }
}
