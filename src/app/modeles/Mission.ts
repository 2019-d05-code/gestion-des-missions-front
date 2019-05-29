import { Statut } from './Statut';

export class Mission {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public statut: Statut,
        public emailColl: string,
    ) { }
}

export class MissionSansStatus {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public emailColl: string,
        public prime: Number,
    ) { }
}

export class MissionManager {

    constructor(
        public id: number,
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
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
