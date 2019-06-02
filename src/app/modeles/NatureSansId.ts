import { NomNature } from './NomNature';

export class NatureSansId {

    constructor(
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
