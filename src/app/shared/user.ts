import { Vaccination } from "./vaccination";
export { Vaccination } from "./vaccination";

export class User {
  constructor(
    public ssNo: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public admin?: boolean,
    public vaccinated?: boolean,
    public gender?: string,
    public vaccination_id?: number,
    public phone?: string,
    public street?: string,
    public houseNumber?: string,
    public zipCode?: string,
    public city?: string
  ) {}
}
