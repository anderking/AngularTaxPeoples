import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Persona } from "../../../models/persona";
import { PersonaService } from "../../../services/persona.service";
import { Empresa } from "../../../models/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { Calificacion } from "../../../models/calificacion";
import { CalificacionService } from "../../../services/calificacion.service";
import { Calification } from "../../../models/calification";
import { ActivatedRoute } from "@angular/router";
import { Global } from "../../../services/global";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-perfilfollow",
  templateUrl: "./perfilfollow.component.html",
})
export class PerfilfollowComponent implements OnInit {
  public user: User;
  public persona: Persona;
  public empresa: Empresa;
  public newCalificacion: Calificacion;
  public save_calificacion: any;
  public calificacion: Calificacion;
  public update_calificacion: any;
  public calificacionesR: any;
  public totalCalificacionesR: number = 0;
  public countCalificacionesR: number = 0;
  public promedioCalificaciones;

  public califications: Calification[];
  public calificationSelected: string;
  public calificacionSelected: string;

  public userReceptorID: string;
  public userEmisorID: string = localStorage.getItem("resID");
  public name: string;
  public value: string;

  public url: string;
  public calificacionBool: boolean;
  public resID: string = localStorage.getItem("resID");

  constructor(
    private _userService: UserService,
    private _personaService: PersonaService,
    private _empresaService: EmpresaService,
    private _calificacionService: CalificacionService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.califications = [
      { _id: "", name: "Seleccione una Calificación" },
      { _id: "1", name: "Muy malo" },
      { _id: "2", name: "Malo" },
      { _id: "3", name: "Regular" },
      { _id: "4", name: "Bueno" },
      { _id: "5", name: "Excelente" },
    ];
  }

  ngOnInit() {
    this.url = Global.url;
    this.calificationSelected = "";
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getUser(id);
      this.userReceptorID = id;
    });

    this.newCalificacion = new Calificacion(
      "",
      this.userEmisorID,
      this.userReceptorID,
      null
    );
    this.isCalificacion(this.userEmisorID, this.userReceptorID);
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        this.user = response.user;
        if (this.user.tipo == "cliente" || this.user.tipo == "admin") {
          this.getPersona(id);
        } else if (this.user.tipo == "miembro") {
          this.getEmpresa(id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPersona(id) {
    this._personaService.getPersona(id).subscribe(
      (response) => {
        this.persona = response.persona;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmpresa(id) {
    this._empresaService.getEmpresa(id).subscribe(
      (response) => {
        this.empresa = response.empresa;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calificar(form: NgForm) {
    if (form.valid) {
      this.newCalificacion.value = form.form.value.value;

      this._calificacionService.upCalificacion(this.newCalificacion).subscribe(
        (response) => {
          this.save_calificacion = response.calificacion;
          this.isCalificacion(this.userEmisorID, this.userReceptorID);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Form no valido");
    }
  }

  isCalificacion(idE, idR) {
    this._calificacionService.isCalificacion(idE, idR).subscribe(
      (response) => {
        this.getUser(this.userReceptorID);
        this.getCalificacion(this.userEmisorID, this.userReceptorID);
        this.getCalificacionesR(this.userReceptorID);
        if (response) {
          this.calificacionBool = true;
        } else this.calificacionBool = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCalificacionesR(idR) {
    this._calificacionService.getCalificacionesR(idR).subscribe(
      (response) => {
        if (response) {
          this.calificacionesR = response.calificacionesR;
          this.totalCalificacionesR = 0;
          this.countCalificacionesR = 0;
          this.promedioCalificaciones = 0;
          for (let element of this.calificacionesR) {
            this.totalCalificacionesR =
              this.totalCalificacionesR + element.value;
            this.countCalificacionesR = this.countCalificacionesR + 1;
            if (this.countCalificacionesR > 0) {
              this.promedioCalificaciones = parseFloat(
                (this.totalCalificacionesR / this.countCalificacionesR).toFixed(
                  2
                )
              );
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCalificacion(idE, idR) {
    this._calificacionService.getCalificacion(idE, idR).subscribe(
      (response) => {
        if (response) {
          this.calificacion = response.calificacion;
          this.calificacionSelected = this.calificacion.value.toString();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCalificar(form: NgForm) {
    if (form.valid) {
      this.calificacion.value = form.form.value.value;
      this._calificacionService.updateCalificacion(this.calificacion).subscribe(
        (response) => {
          this.update_calificacion = response.categoria;
          this.getUser(this.userReceptorID);
          this.isCalificacion(this.userEmisorID, this.userReceptorID);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  goBack() {
    this._location.back();
  }
}
