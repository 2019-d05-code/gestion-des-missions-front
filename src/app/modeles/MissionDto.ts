import { Statut } from './Statut';
import { Nature } from './Nature';



export class MissionDto {
    constructor(
        public id: Number, public dateDebut: Date, public dateFin: Date, public nature: Nature, public villeDepart: string,
         public villeArrivee: string, public transport: Transport, public statut: Statut) {}
}
