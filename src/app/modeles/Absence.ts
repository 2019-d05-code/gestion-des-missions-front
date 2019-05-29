import { NomNature } from './NomNature';

export class Absence {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: NomNature = NomNature.Congé,
        public email: string,
        public id: number
    ) { }
}
