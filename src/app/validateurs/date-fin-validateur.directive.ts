import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appDateFinValidateur]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateFinValidateurDirective, multi: true }]
})
export class DateFinValidateurDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const dateFinControl = control.get('dateFin');
        const dateDebutControl = control.get('dateDebut');
        if (dateFinControl != null) {
            const dateDebut = new Date(dateDebutControl.value);
            const dateFin = new Date(dateFinControl.value);

            if (dateDebut.getTime() > dateFin.getTime()) {
                return { dateFin: `La date de fin est antérieure à celle du début !` };
            }
        }

        return null;
    }

    constructor() { }

}
