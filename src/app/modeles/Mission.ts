import { Nature } from './Nature';
import { Statut } from './Statut';

export class Mission {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public statut: Statut
    ) { }
}

export class MissionManager {

    constructor(
        public id: number,
        public dateDebut: Date,
        public dateFin: Date,
        public nature: Nature,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
    ) { }
}

export class MissionStatut {

    constructor(
        public id: number,
        public statut: Statut
    ) { }
}
