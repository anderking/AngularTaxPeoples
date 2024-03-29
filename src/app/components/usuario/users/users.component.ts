import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { PublicationService } from "../../../services/publication.service";
import { Global } from "../../../services/global";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  providers: [UserService, PublicationService],
})
export class UsersComponent implements OnInit {
  public users: any;
  public total: number = 0;
  public resID: string;
  public url: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public message: string;
  public failedConect: string;
  public filterUsers: any = "";

  constructor(private _userService: UserService, private _location: Location) {}

  ngOnInit() {
    this.resID = localStorage.getItem("resID");
    this.url = Global.url;
    this.getUsers(this.resID);
  }

  getUsers(id) {
    this._userService.getUsersExcept(id).subscribe(
      (response) => {
        if (response.users) {
          this.users = response.users;
          this.total = this.users.length;
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect =
              "Ups!!! hay problemas para conectar con la API, probablemente no haya internet";
          }
        }
        console.log(error);
      }
    );
  }

  delete(id) {
    this._userService.deleteUser(id).subscribe(
      (response) => {
        this.message = response.message;
        this.isAlert = true;
        this.onIsError();
        this.getUsers(this.resID);
      },
      (error) => {
        this.message = error.message;
        this.isAlert = false;
        this.onIsError();
      }
    );
  }

  deleteUsers() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este proceso es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUsers(this.resID).subscribe(
          (response) => {
            this.message = response.message;
            this.isAlert = true;
            this.onIsError();
            this.getUsers(this.resID);
          },
          (error) => {
            this.message = error.message;
            this.isAlert = false;
            this.onIsError();
          }
        );
      }
    });
  }

  onIsError() {
    this.isError = true;
    window.scrollTo(0, 0);
  }

  closeAlertError() {
    this.isError = false;
  }

  goBack() {
    this._location.back();
  }

  deleteConfirmation(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este proceso es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.delete(id);
      }
    });
  }
}
