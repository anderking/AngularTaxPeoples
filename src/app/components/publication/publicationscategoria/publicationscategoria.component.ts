import { Component, OnInit } from "@angular/core";
import { CategoriaService } from "../../../services/categoria.service";
import { RutaService } from "../../../services/ruta.service";
import { Global } from "../../../services/global";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-publicationscategoria",
  templateUrl: "./publicationscategoria.component.html",
})
export class PublicationscategoriaComponent implements OnInit {
  public publicationsCategoria: any;
  public categorias: any;
  public rutas: any;
  public url: string;
  public total: number = 0;
  public resID: string;
  public rolID: string;
  public failedConect: string;

  constructor(
    private _categoriaService: CategoriaService,
    private _rutaService: RutaService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.url = Global.url;
    this.resID = localStorage.getItem("resID");
    this.rolID = localStorage.getItem("rolID");
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getpublicationsCategoria(id);
    });
    this.getCategorias();
    this.getRutas();
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

  getpublicationsCategoria(id) {
    this._categoriaService.getpublicationsCategoria(id).subscribe(
      (response) => {
        this.publicationsCategoria = response.publicationsCategoria;
        this.total = this.publicationsCategoria.length;
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect = Global.failed;
          }
        }
        console.log(<any>error);
      }
    );
  }

  goBack() {
    this._location.back();
  }
}
