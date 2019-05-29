import { Statut } from './Statut';
import { Frais } from './Frais';

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

export class MissionAvecFrais {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public frais: Frais,
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
