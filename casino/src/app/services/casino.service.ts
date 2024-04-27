import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CasinoService {
  private urlBase = "http://localhost:3000";
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
    return this.http.get(`${this.urlBase}/cash-out`, { withCredentials: true });
  }
}
