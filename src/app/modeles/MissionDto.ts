import { Statut } from './Statut';
import { Frais } from './Frais';

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

export class MissionDtoAvecFrais {
    constructor(
        public id: Number,
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public frais: Frais,
        public statut: Statut,
        public prime: Number) { }
}

