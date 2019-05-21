import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appDateFinValidateur]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateFinValidateurDirective, multi: true }]
})
export class DateFinValidateurDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors {

        console.log(control.get('dateFin'));

        throw new Error("Method not implemented.");
    }

    constructor() { }

}
