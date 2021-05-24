import { Location } from "./location";
export { Location } from "./location";

export class Vaccination {
  constructor(
    public id: string,
    public from: Date,
    public to: Date,
    public maxPatients: number,
    public location: Location,
    public location_id: string
  ) {}
}
