import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Empresa } from "../../../models/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { Categoria } from "../../../models/categoria";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editempresa",
  templateUrl: "./editempresa.component.html",
  providers: [UserService, EmpresaService],
})
export class EditempresaComponent implements OnInit {
  public user: User;
  public empresa: Empresa;
  public categoria: Categoria[];
  public resID: string;
  public update_empresa;
  public message: string;
  public isError: boolean = false;
  public isAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _empresaService: EmpresaService,
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
    this.resID = localStorage.getItem("resID");
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.isLoading = true;
      this.getUser(id);
      this.getEmpresa(id);
    });
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

  getEmpresa(id) {
    this._empresaService.getEmpresa(id).subscribe(
      (response) => {
        this.empresa = response.empresa;
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
      this._empresaService.updateEmpresa(this.empresa).subscribe(
        (response) => {
          if (response.empresa) {
            this.update_empresa = response.empresa;
            this.isAlert = true;
            this.message = response.message;
            this.onIsError();
            this.isLoading = false;
          } else {
            this.isAlert = false;
            this.message = response.message;
            this.onIsError();
            this.isLoading = false;
          }
        },
        (error) => {
          this.message = error.message;
          console.log(error);
          this.isAlert = false;
          this.onIsError();

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.message = error.error.message;
            }
          }
          this.isLoading = false;
        }
      );
    } else {
      this.onIsError();
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
