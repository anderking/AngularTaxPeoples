import { Component } from "@angular/core";
import { Ruta } from "../../../models/ruta";
import { RutaService } from "../../../services/ruta.service";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-rutascreate",
  templateUrl: "./rutascreate.component.html",
})
export class RutascreateComponent {
  public ruta: Ruta;
  public name: string;
  public description: string;
  public save_ruta;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(private _rutaService: RutaService, private _location: Location) {
    this.ruta = new Ruta("", "", "");
  }

  register(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this.ruta.name = form.form.value.name;
      this.ruta.description = form.form.value.description;

      this._rutaService.saveRuta(this.ruta).subscribe(
        (response: any) => {
          if (response.ruta) {
            this.save_ruta = response.ruta;
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
        }
      );
    } else {
      this.onIsError();
    }
  }
  messageError(error: HttpErrorResponse) {
    this.isLoading = false;
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

  goBack() {
    this._location.back();
  }
}
