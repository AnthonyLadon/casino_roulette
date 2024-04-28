import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrlBase } from "../environements";

@Injectable({
  providedIn: "root",
})
export class CasinoService {
  private urlBase = apiUrlBase;

  constructor(private http: HttpClient) {}

  getSession() {
    return this.http.get<any>(`${this.urlBase}/session-data`, {
      withCredentials: true,
    });
  }

  startNewGame() {
    return this.http.get<any>(`${this.urlBase}/start-game`, {
      withCredentials: true,
    });
  }

  roll() {
    return this.http.get<any>(`${this.urlBase}/roll`, {
      withCredentials: true,
    });
  }

  getCashOut() {
    return this.http.get<any>(`${this.urlBase}/cash-out`, {
      withCredentials: true,
    });
  }
}
