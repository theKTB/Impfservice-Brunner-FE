import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
    admin: string;
    vaccinated: string;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string =
    "https://impfservice-brunner21.s1810456006.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    localStorage.setItem("token", token);
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem("userId", decodedToken.user.id);
    localStorage.setItem("admin", decodedToken.user.admin);
    localStorage.setItem("vaccinated", decodedToken.user.vaccinated);
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  public isLoggedIn() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
  }

  public isAdmin() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      if (decodedToken.user.admin == "1") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public isVaccinated() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      if (decodedToken.user.vaccinated == "1") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
