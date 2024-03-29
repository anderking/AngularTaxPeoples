import { Component, OnInit } from "@angular/core";
import { Categoria } from "../../../models/categoria";
import { CategoriaService } from "../../../services/categoria.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-categoriasedit",
  templateUrl: "./categoriasedit.component.html",
})
export class CategoriaseditComponent implements OnInit {
  public categoria: Categoria;
  public update_categoria;
  public show: boolean = false;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _categoriaService: CategoriaService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getCategoria(id);
    });
  }

  getCategoria(id) {
    this.isLoading = true;
    this._categoriaService.getCategoria(id).subscribe(
      (response) => {
        this.categoria = response.categoria;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  update(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this._categoriaService.updateCategoria(this.categoria).subscribe(
        (response: any) => {
          if (response.categoria) {
            this.update_categoria = response.categoria;
            this.getCategoria(this.update_categoria._id);
            this.message = response.message;
            this.isAlert = true;
            this.isLoading = false;
            this.onIsError();
          } else {
            this.message = response.message;
            this.isAlert = false;
            this.isLoading = false;
            this.onIsError();
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
