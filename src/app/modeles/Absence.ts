import { NomNature } from './NomNature';

export class Absence {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public email: string,
        public id: number,
        public motif: string = '-',
        public statut: string = '-',
        public type: string = 'Congé'//NomNature = NomNature.Congé, //string = 'Congé',
    ) { }
}
