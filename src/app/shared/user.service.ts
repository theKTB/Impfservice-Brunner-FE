import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "./user";

@Injectable()
export class UserService {
  private api =
    "https://impfservice-brunner21.s1810456006.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}