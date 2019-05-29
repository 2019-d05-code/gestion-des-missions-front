import { Statut } from './Statut';

export class MissionDto {
    constructor(
        public id: Number,
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public statut: Statut,
        public prime: Number) { }
}
