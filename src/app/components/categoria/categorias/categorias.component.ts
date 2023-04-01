import { Component, OnInit } from "@angular/core";
import { CategoriaService } from "../../../services/categoria.service";
import { Global } from "../../../services/global";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
})
export class CategoriasComponent implements OnInit {
  public categorias: any;
  public resID: string;
  public url: string;
  public total: number = 0;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public message: string;
  public failedConect: string;
  public filterCategorias: any = "";

  constructor(
    private _categoriaService: CategoriaService,
    private _location: Location
  ) {}
  ngOnInit() {
    this.url = Global.url;
    this.getCategorias();
    this.resID = localStorage.getItem("resID");
  }

  getCategorias() {
    this._categoriaService.getCategorias().subscribe(
      (response) => {
        if (response.categorias) {
          this.categorias = response.categorias;
          this.total = this.categorias.length;
        }
      },
      (error) => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect = Global.failed;
          }
        }
      }
    );
  }

  delete(id) {
    this._categoriaService.deleteCategoria(id).subscribe(
      (response) => {
        this.message = response.message;
        this.isAlert = true;
        this.onIsError();
        this.getCategorias();
      },
      (error) => {
        this.message = error.message;
        this.isAlert = false;
        this.onIsError();
      }
    );
  }

  deletecategorias() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este proceso es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this._categoriaService.deleteCategorias().subscribe(
          (response) => {
            this.message = response.message;
            this.isAlert = true;
            this.onIsError();
            this.getCategorias();
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
