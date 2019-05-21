import { NomNature } from './NomNature';

export class Nature {

  constructor(
    public intitule: NomNature,
    public missionFacturee: boolean,
    public prime: boolean,
    public tjm: number,
    public pourcentage: number,
    public dateDebutValidite: Date,
    public dateFinValidite: Date
  ) { }
};
