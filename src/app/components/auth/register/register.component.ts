import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  public user: User;
  public email: string;
  public password: string;
  public tipo: string = "null";
  public resID: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public message: string;

  constructor(private authService: AuthService, private _location: Location) {}

  register(form: NgForm) {
    if (form.valid) {
      this.authService.register(this.email, this.password, this.tipo).subscribe(
        (res) => {
          this.resID = res.user._id;
          localStorage.setItem("token", res.token);
          localStorage.setItem("resID", this.resID);
          this.loginRedirect();
        },
        (error) => {
          console.log(error);
          this.isAlert = false;
          this.message = error.message;
          this.onIsError();

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.message = error.error.message;
            }
          }
        }
      );
    } else {
      this.onIsError();
    }
  }

  onIsError() {
    this.isError = true;
    window.scrollTo(0, 0);
  }

  closeAlertError() {
    this.isError = false;
  }

  loginRedirect() {
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/perfil/" + this.resID);
  }

  goBack() {
    this._location.back();
  }
}
