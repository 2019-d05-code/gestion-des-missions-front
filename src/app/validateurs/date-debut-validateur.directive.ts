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
        const dateDebutMissionControl = control.get('dateDebut');
        const transportControl = control.get('transport');

        let avionChar = "";
        let messageRetour;

        if (dateDebutMissionControl != null) {
            const dateDebutMission = new Date(dateDebutMissionControl.value);

            // Conditions particulières si l'on veut faire une mission en avion
            if (transportControl != null) {
                console.log(transportControl);
                console.log(transportControl.value);

                if (transportControl.value === `Avion`) {
                    dateMaintenant.setDate(dateMaintenant.getDate() + 6); // 6 jours car le jour même n'est pas autorisé dans les tests
                    avionChar = `Quand vous prenez l'avion vous devez prévoir 7 jours à partir d'aujourd'hui !`;
                }
            }

            if (dateMaintenant.getFullYear() === dateDebutMission.getFullYear()
                && dateMaintenant.getMonth() === dateDebutMission.getMonth()
                && dateMaintenant.getDate() === dateDebutMission.getDate()) {
                if (avionChar == "") {
                    messageRetour = `Vous n'avez pas le droit d'enregistrer une mission aujourd'hui !`;
                }
                else {
                    messageRetour = `${avionChar}`;
                }

            }
            else if (dateMaintenant.getTime() > dateDebutMission.getTime()) {
                if (avionChar == "") {
                    messageRetour = `La date est antérieure à celle d'aujourd'hui !`;
                }
                else {
                    messageRetour = `${avionChar}`;
                }

            }

            return { dateDebut: messageRetour };
        }

        return null;
    }
}
