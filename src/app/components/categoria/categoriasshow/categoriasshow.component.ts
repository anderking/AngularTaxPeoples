import { Component, OnInit } from "@angular/core";
import { Categoria } from "../../../models/categoria";
import { CategoriaService } from "../../../services/categoria.service";
import { PublicationService } from "../../../services/publication.service";
import { Global } from "../../../services/global";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-categoriasshow",
  templateUrl: "./categoriasshow.component.html",
})
export class CategoriasshowComponent implements OnInit {
  public categoria: Categoria;
  public publicationsCategoria: any;
  public publicationsCategoriaID: string;
  public total: number = 0;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public message: string;
  public failedConect: string;

  constructor(
    private _categoriaService: CategoriaService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.publicationsCategoriaID = id;
      this.getCategoria(id);
      this.getpublicationsCategoria(id);
    });
  }

  getCategoria(id) {
    this._categoriaService.getCategoria(id).subscribe(
      (response) => {
        this.categoria = response.categoria;
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

  getpublicationsCategoria(id) {
    this._categoriaService.getpublicationsCategoria(id).subscribe(
      (response) => {
        this.publicationsCategoria = response.publicationsCategoria;
        this.total = this.publicationsCategoria.length;
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
    this._publicationService.deletePublication(id).subscribe(
      (response) => {
        this.message = response.message;
        this.isAlert = true;
        this.onIsError();
        this.getpublicationsCategoria(this.publicationsCategoriaID);
      },
      (error) => {
        this.message = error.message;
        this.isAlert = false;
        this.onIsError();
      }
    );
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
