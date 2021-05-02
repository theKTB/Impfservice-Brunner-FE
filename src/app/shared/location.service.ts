import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Location } from "./location";

@Injectable()
export class LocationService {
  private api =
    "https://impfservice-brunner21.s1810456006.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Array<Location>> {
    return this.http
      .get<Array<Location>>(`${this.api}/locations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
