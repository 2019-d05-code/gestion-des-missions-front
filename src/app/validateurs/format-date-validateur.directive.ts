import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[appFormatDateValidateur]',
    providers: [{ provide: NG_VALIDATORS, useExisting: FormatDateValidateurDirective, multi: true }]
})
export class FormatDateValidateurDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const dateAvantTraitement = control.value;
        const shortDate = dateAvantTraitement.ToString(`dd/MM/YYYY`);

        if (dateAvantTraitement === shortDate) {
            return { formatDate: `La date de fin est antérieure à celle du début !` };
        }

        return null;
    }

    constructor() { }

}
