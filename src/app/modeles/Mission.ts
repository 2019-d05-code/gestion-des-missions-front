import { Nature } from './Nature';
import { Statut } from './Statut';
import { Transport } from './Transport';

export class Mission {

    constructor(
        public dateDebut: Date,
        public dateFin: Date,
        public nature: Nature,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public statut: Statut
    ) { }
}
