import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { Global } from "./global";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LoginResponse, RegisterResponse } from "../models/response/login";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(this.url + "signin", {
        email: email,
        password: password,
      })
      .pipe(
        map((data) => {
          return data as LoginResponse;
        })
      );
  }

  register(
    email: string,
    password: string,
    tipo: string
  ): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(this.url + "signup", {
      email: email,
      password: password,
      tipo: tipo,
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUserToken() {
    return localStorage.removeItem("token");
  }
  logoutUserResID() {
    return localStorage.removeItem("resID");
  }
  logoutClear() {
    return localStorage.clear();
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }
}
