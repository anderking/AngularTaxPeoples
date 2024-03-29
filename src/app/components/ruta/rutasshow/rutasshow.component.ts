import { Component, OnInit } from "@angular/core";
import { Ruta } from "../../../models/ruta";
import { RutaService } from "../../../services/ruta.service";
import { PublicationService } from "../../../services/publication.service";
import { Global } from "../../../services/global";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-rutasshow",
  templateUrl: "./rutasshow.component.html",
})
export class RutasshowComponent implements OnInit {
  public ruta: Ruta;
  public publicationsRuta: any;
  public publicationsRutaID: string;
  public total: number = 0;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public message: string;
  public failedConect: string;

  constructor(
    private _rutaService: RutaService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.publicationsRutaID = id;
      this.getRuta(id);
      this.getpublicationsRuta(id);
    });
  }

  getRuta(id) {
    this._rutaService.getRuta(id).subscribe(
      (response) => {
        this.ruta = response.ruta;
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

  getpublicationsRuta(id) {
    this._rutaService.getpublicationsRuta(id).subscribe(
      (response) => {
        this.publicationsRuta = response.publicationsRuta;
        this.total = this.publicationsRuta.length;
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
        this.getpublicationsRuta(this.publicationsRutaID);
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
