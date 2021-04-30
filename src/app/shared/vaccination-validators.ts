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

  /*static isbnExists(bs : BookStoreService) {
  return function(control: FormControl): Observable<{[error: string]: any}> {
   return bs.check(control.value)
     .pipe(map(exists => !exists ? null : {isbnExists: {valid: false}}));
 }
}*/

}