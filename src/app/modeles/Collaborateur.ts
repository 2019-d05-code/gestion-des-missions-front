import { Profil } from './Profil';

export class Collaborateur {

  constructor(
    public email: string,
    public motDePasse: string,
    public profil = new Array<Profil> ()
  ) { }
}

export class CollConn {

    constructor(
      public email: string,
      public nom: string,
      public prenom: string,
      public roles = new Array<Profil> ()
    ) { }
  }
