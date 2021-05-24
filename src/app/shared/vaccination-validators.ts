import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class VaccinationValidators {
  static datePast(control: FormControl):{[error:string]:any}{
    if(!control.value){
      return null;
    }
    const from = new Date(control.value);
    return from >= new Date() ? null : {dateFrom:{valid:false}};
  }

}