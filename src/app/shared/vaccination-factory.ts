import { Vaccination } from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    //TODO: Kann ich hier bei der Location Null mitgeben, wenn das DB-Feld nicht nullable ist?
    return new Vaccination(null, null, null, 0, null);
  }

  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.from,
      rawVaccination.to,
      rawVaccination.maxParticipants,
      rawVaccination.location
    );
  }
}
