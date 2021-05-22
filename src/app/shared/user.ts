import { Vaccination } from "./vaccination";
export { Vaccination } from "./vaccination";

export class User {
  constructor(
    public id: string,
    public socialNumber: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public admin?: boolean,
    public vaccinated?: boolean,
    public gender?: string,
    public vaccination?: Vaccination,
    public phone?: string,
    public street?: string,
    public houseNumber?: string,
    public zipCode?: string,
    public city?: string
  ) {}
}
