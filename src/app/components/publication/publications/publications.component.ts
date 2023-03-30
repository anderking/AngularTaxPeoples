import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../../../services/publication.service";
import { CategoriaService } from "../../../services/categoria.service";
import { RutaService } from "../../../services/ruta.service";
import { Global } from "../../../services/global";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-publications",
  templateUrl: "./publications.component.html",
})
export class PublicationsComponent implements OnInit {
  public publications: any;
  public categorias: any;
  public rutas: any;
  public url: string;
  public total: number = 0;
  public resID: string;
  public rolID: string;
  public failedConect: string;

  constructor(
    private _publicationService: PublicationService,
    private _categoriaService: CategoriaService,
    private _rutaService: RutaService,
    private _location: Location,
  ) {
    this.url = Global.url;
    this.resID = localStorage.getItem("resID");
    this.rolID = localStorage.getItem("rolID");
  }

  ngOnInit() {
    this.getPublications();
    this.getCategorias();
    this.getRutas();
  }

  getPublications() {
    this._publicationService.getPublications().subscribe(
      (response) => {
        if (response.publications) {
          this.publications = response.publications;
          this.total = this.publications.length;
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect = Global.failed;
          }
        }
        console.log(error);
      }
    );
  }

  getCategorias() {
    this._categoriaService.getCategorias().subscribe(
      (response) => {
        if (response.categorias) {
          this.categorias = response.categorias;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRutas() {
    this._rutaService.getRutas().subscribe(
      (response) => {
        if (response.rutas) {
          this.rutas = response.rutas;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this._location.back();
  }
}
