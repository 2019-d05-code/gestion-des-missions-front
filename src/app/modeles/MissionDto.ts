


export class MissionDto {
    constructor(
        public dateDebut: Date, public dateFin: Date, /*Nature nature,*/ public villeDepart: string,
         public villeArrivee: string, public transport: Transport, public statut: Statut){}
}
