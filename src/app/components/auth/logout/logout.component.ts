import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
})
export class LogoutComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.logoutClear();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/login/");
  }
}
