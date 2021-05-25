import { Vaccination } from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let hour = new Date().getHours();
  
    return new Vaccination(null, new Date(year, month, day, hour+1), new Date(year, month, day, hour+2), null, null, null, null);
  }

  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.from,
      rawVaccination.to,
      rawVaccination.maxParticipants,
      rawVaccination.location,
      rawVaccination.location_id,
      rawVaccination.users
    );
  }
}
