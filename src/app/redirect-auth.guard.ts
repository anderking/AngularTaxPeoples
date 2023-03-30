import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root",
})
export class RedirectAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.loggedIn()) {
      this._router.navigate(["/perfil/" + localStorage.getItem("resID")]);
      return false;
    } else {
      return true;
    }
  }
}
