import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "./user";
import { Vaccination } from "./vaccination";

@Injectable()
export class VaccinationService {
  private api =
    "https://impfservice-brunner21.s1810456006.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAllVaccinations(): Observable<Array<Vaccination>> {
    return this.http
      .get<Array<Vaccination>>(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getVaccination(id: string): Observable<Vaccination> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  removeVaccination(id: string): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccination/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  createVaccination(vaccination: Vaccination): Observable<any> {
    return this.http
      .post(`${this.api}/vaccination`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateVaccination(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccination/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  associateVaccination(userId, vaccinationId): Observable<any> {
    return this.http
      .put(`${this.api}/vaccination/${vaccinationId}/book`, {userId, vaccinationId})
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
