import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-edituser",
  templateUrl: "./edituser.component.html",
  providers: [UserService],
})
export class EdituserComponent implements OnInit {
  public user: User;
  public update_user;
  public type: string = "password";
  public show: boolean = false;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getUser(id);
    });
  }

  getUser(id) {
    this.isLoading = true;
    this._userService.getUser(id).subscribe(
      (response) => {
        this.user = response.user;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  update(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this._userService.updateUser(this.user).subscribe(
        (response) => {
          if (response.user) {
            this.update_user = response.user;
            this.message = response.message;
            this.isAlert = true;
            this.onIsError();
            this.isLoading = false;
          } else {
            this.message = response.message;
            this.isAlert = false;
            this.onIsError();
            this.isLoading = false;
          }
        },
        (error: HttpErrorResponse) => {
          this.messageError(error);
          this.isLoading = false;
        }
      );
    } else {
      this.onIsError();
    }
  }

  messageError(error: HttpErrorResponse) {
    this.message = error.message;
    console.log(error);
    this.isAlert = false;
    this.onIsError();
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        this.message = error.error.message;
        console.log(error);
        this.isAlert = false;
        this.onIsError();
      }

      if (error.status === 500) {
        this.message = error.error.message;
        console.log(error);
        this.isAlert = false;
        this.onIsError();
      }
    }
  }

  onIsError() {
    this.isError = true;
    window.scrollTo(0, 0);
  }

  closeAlertError() {
    this.isError = false;
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
