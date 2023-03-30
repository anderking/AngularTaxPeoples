import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  providers: [AuthService, UserService],
})
export class LoginComponent {
  @ViewChild("loginForm", { read: NgForm }) loginForm: NgForm;
  public user: User;
  public email: string = "admin@admin.com";
  public password: string = "admin*2021";
  public type: string = "password";
  public show: boolean = false;
  public resID: string = localStorage.getItem("resID");
  public url: string;
  public isError: boolean = false;
  public messageError: string;
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private _location: Location
  ) {}

  login(form: NgForm) {
    console.log(form.valid);
    if (form.valid) {
      this.spinner.show();
      this.authService.login(this.email, this.password).subscribe(
        (res) => {
          this.resID = res.user[0]._id;
          this.isError = false;
          this.loginRedirect(res);
        },
        (error) => {
          this.spinner.hide();
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.messageError = error.error.message;
              console.log(error);
              this.onIsError();
            }
          } else {
            this.messageError = error.message;
            console.log(error);
            this.onIsError();
          }
        }
      );
    } else {
      this.onIsError();
    }
  }
  onIsError() {
    this.isError = true;
  }
  closeAlertError() {
    this.isError = false;
  }

  loginRedirect(res) {
    this.spinner.hide();
    localStorage.setItem("token", res.token);
    localStorage.setItem("resID", res.user[0]._id);
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/perfil/" + this.resID);
  }

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  goBack() {
    this._location.back();
  }
}
