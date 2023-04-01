import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { Persona } from "../../../models/persona";
import { PersonaService } from "../../../services/persona.service";
import { Empresa } from "../../../models/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UploadService } from "../../../services/upload.service";
import { Global } from "../../../services/global";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  providers: [UserService, UploadService, PersonaService, EmpresaService],
})
export class PerfilComponent implements OnInit {
  public user: User;
  public persona: Persona;
  public empresa: Empresa;
  public resID: string;
  public rolID: string;
  public filesToUpload: Array<File>;
  public fileName: string = "";
  public url: string;
  public isFileChosen: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _personaService: PersonaService,
    private _empresaService: EmpresaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService,
    private _location: Location
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getUser(id);
      this.resID = id;
    });
  }

  getUser(id: string) {
    this.isLoading = true;
    this._userService.getUser(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.user = response.user;
        localStorage.setItem("rolID", this.user.tipo);
        this.rolID = localStorage.getItem("rolID");

        if (this.rolID == "null") {
          this._router.navigate(["/register/" + this.resID]);
        } else {
          if (this.rolID == "cliente" || this.rolID == "admin") {
            this.getPersona(id);
          } else if (this.rolID == "miembro") {
            this.getEmpresa(id);
          }
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getPersona(id: string) {
    this.isLoading = true;
    this._personaService.getPersona(id).subscribe(
      (response) => {
        this.isLoading = false;
        if (this.rolID == "cliente" || this.rolID == "admin") {
          if (!response.persona) {
            this._router.navigate(["/registerN/" + this.resID]);
          } else {
            this.persona = response.persona;
          }
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getEmpresa(id: string) {
    this.isLoading = true;
    this._empresaService.getEmpresa(id).subscribe(
      (response) => {
        this.isLoading = false;
        if (this.rolID == "miembro") {
          if (!response.empresa) {
            this._router.navigate(["/registerJ/" + this.resID]);
          } else {
            this.empresa = response.empresa;
          }
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this._userService.updateUser(this.user).subscribe(
        (response) => {
          if (response.user) {
            if (this.filesToUpload) {
              this._uploadService
                .makeFileRequest(
                  Global.url + "upload-image-user/" + response.user._id,
                  [],
                  this.filesToUpload,
                  "image"
                )
                .then((result: any) => {
                  const actualRoute = window.location.href;
                  window.location.replace(actualRoute);
                });
            } else {
              this.getUser(this.user._id);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Ha ocurrido un error");
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  preUpload(event: any) {
    let file = event.target.files[0];
    if (event.target.files.length > 0) {
      this.isFileChosen = true;
    }
    this.fileName = file.name;
    this.filesToUpload = <Array<File>>event.target.files;
  }

  goBack() {
    this._location.back();
  }
}
