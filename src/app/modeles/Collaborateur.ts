import { Profil } from './Profil';

export class Collaborateur {

  constructor(
    public email: string,
    public motDePasse: string,
    public profil: Profil
  ) { }
}
