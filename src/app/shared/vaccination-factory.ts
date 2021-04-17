import { Vaccination } from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    //TODO: Kann ich hier bei der Location Null mitgeben, wenn das DB-Feld nicht nullable ist?
    return new Vaccination(null, new Date(), new Date(), 0, null);
  }

  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      typeof rawVaccination.from === "string"
        ? new Date(rawVaccination.from)
        : rawVaccination.from,
      typeof rawVaccination.to === "string"
        ? new Date(rawVaccination.to)
        : rawVaccination.to,
      rawVaccination.maxParticipants,
      rawVaccination.location_id
    );
  }
}
