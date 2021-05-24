import { Location } from "./location";
import { User } from "./user";
export { Location } from "./location";
export { User } from "./user";

export class Vaccination {
  constructor(
    public id: string,
    public from: Date,
    public to: Date,
    public maxPatients: number,
    public location: Location,
    public location_id: string,
    public users?: User[]
  ) {}
}
