import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Persona } from "../../../models/persona";
import { PersonaService } from "../../../services/persona.service";
import { Categoria } from "../../../models/categoria";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editpersona",
  templateUrl: "./editpersona.component.html",
  providers: [UserService, PersonaService],
})
export class EditpersonaComponent implements OnInit {
  public user: User;
  public persona: Persona;
  public categoria: Categoria[];
  public update_persona;
  public fechaActual: any;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.categoria = [
      { _id: "", name: "Seleccione un Estado", description: "" },
      { _id: "Amazonas", name: "Amazonas", description: "" },
      { _id: "Anzoátegui", name: "Anzoátegui", description: "" },
      { _id: "Apure", name: "Apure", description: "" },
      { _id: "Aragua", name: "Aragua", description: "" },
      { _id: "Barinas", name: "Barinas", description: "" },
      { _id: "Bolívar", name: "Bolívar", description: "" },
      { _id: "Carabobo", name: "Carabobo", description: "" },
      { _id: "Cojedes", name: "Cojedes", description: "" },
      { _id: "Delta Amacuro", name: "Delta Amacuro", description: "" },
      { _id: "Caracas", name: "Caracas", description: "" },
      { _id: "Falcón", name: "Falcón", description: "" },
      { _id: "Guárico", name: "Guárico", description: "" },
      { _id: "Lara", name: "Lara", description: "" },
      { _id: "Mérida", name: "Mérida", description: "" },
      { _id: "Miranda", name: "Miranda", description: "" },
      { _id: "Monagas", name: "Monagas", description: "" },
      { _id: "Nueva Esparta", name: "Nueva Esparta", description: "" },
      { _id: "Portuguesa", name: "Portuguesa", description: "" },
      { _id: "Sucre", name: "Sucre", description: "" },
      { _id: "Táchira", name: "Táchira", description: "" },
      { _id: "Trujillo", name: "Trujillo", description: "" },
      { _id: "Vargas", name: "Vargas", description: "" },
      { _id: "Yaracuy", name: "Yaracuy", description: "" },
      { _id: "Zulia", name: "Zulia", description: "" },
    ];
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.isLoading = true;
      this.getUser(id);
      this.getPersona(id);
    });
    const fecha = new Date();
    const fecha2 = fecha.setDate(fecha.getDate() - 1);
    this.fechaActual = new Date(fecha2).toISOString().split("T")[0];
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        this.user = response.user;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  getPersona(id) {
    this._personaService.getPersona(id).subscribe(
      (response) => {
        this.persona = response.persona;
        this.persona.fechaNacimiento =
          this.persona.fechaNacimiento.split("T")[0];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  update(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      const fechaActual = new Date();
      const fechaForm = new Date(form.form.value.fechaNacimiento);
      const fechaForm2 = new Date(fechaForm.setDate(fechaForm.getDate() + 1));

      if (fechaForm2 < fechaActual) {
        this._personaService.updatePersona(this.persona).subscribe(
          (response) => {
            if (response.persona) {
              this.update_persona = response.persona;
              this.isAlert = true;
              this.message = response.message;
              this.onIsError();
            } else {
              this.isAlert = true;
              this.message = response.message;
              this.onIsError();
            }
            this.isLoading = false;
          },
          (error: HttpErrorResponse) => {
            this.messageError(error);
            this.isLoading = false;
          }
        );
      } else {
        window.scrollTo(0, 0);
        this.isAlert = false;
        this.onIsError();
        this.message =
          "La fecha de nacimiento no puede ser mayor que la fecha actual";
      }
    } else {
      this.onIsError();
    }
  }

  messageError(error: HttpErrorResponse | any) {
    this.isAlert = false;
    this.message = error.message;
    this.onIsError();

    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        this.message = error.error.message;
        console.log(error);
      }
    } else {
      this.message = error.message;
      console.log(error);
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
