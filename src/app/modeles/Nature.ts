import { NomNature } from './NomNature';

export class Nature {

    constructor(
        public id: Number,
        public nomNature: string,
        public facturee: boolean,
        public prime: boolean,
        public tauxJournalierMoyen: number,
        public pourcentPrime: number,
        public plafondQuotidien: number,
        public depassementFrais: boolean,
        public dateDebut: Date,
        public dateFin: Date
    ) { }
}
