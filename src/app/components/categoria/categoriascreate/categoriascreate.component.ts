import { Component } from "@angular/core";
import { Categoria } from "../../../models/categoria";
import { CategoriaService } from "../../../services/categoria.service";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-categoriascreate",
  templateUrl: "./categoriascreate.component.html",
})
export class CategoriascreateComponent {
  public categoria: Categoria;
  public name: string;
  public description: string;
  public save_categoria;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _categoriaService: CategoriaService,
    private _location: Location
  ) {
    this.categoria = new Categoria("", "", "");
  }

  register(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this.categoria.name = form.form.value.name;
      this.categoria.description = form.form.value.description;

      this._categoriaService.saveCategoria(this.categoria).subscribe(
        (response: any) => {
          if (response.categoria) {
            this.save_categoria = response.categoria;
            this.message = response.message;
            this.isAlert = true;
            this.onIsError();
            form.reset();
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
