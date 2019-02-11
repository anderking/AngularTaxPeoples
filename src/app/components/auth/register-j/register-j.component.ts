import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Categoria } from '../../../models/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-j',
  templateUrl: './register-j.component.html',
  styleUrls: ['./register-j.component.css'],
  providers: [UserService,EmpresaService]
})

export class RegisterJComponent implements OnInit {

  public user:User;
  public name:string;
  public rif:string;
  public telefono:string;
  public direccion:string;
  public update_user;
  public empresa:Empresa;
  public tipo:string="miembro";
  public categoria:Categoria[];
  public categoriaSelected:string="";
  public resID:string;
  public isError:boolean = false;
  public isAlert:boolean = false;
  public message:string;

  constructor
  (
    private _router: Router,
    private _route: ActivatedRoute,
    private authService: AuthService,
    private _userService: UserService,
    private _empresaService: EmpresaService,
    private spinner: NgxSpinnerService,
    private _location: Location,

  )
  {    
    this.categoria= [
      {_id:"",name:"Seleccione un Estado",description:""},
      {_id:"Amazonas",name:"Amazonas",description:""},
      {_id:"Anzoátegui",name:"Anzoátegui",description:""},
      {_id:"Apure",name:"Apure",description:""},
      {_id:"Aragua",name:"Aragua",description:""},
      {_id:"Barinas",name:"Barinas",description:""},
      {_id:"Bolívar",name:"Bolívar",description:""},
      {_id:"Carabobo",name:"Carabobo",description:""},
      {_id:"Cojedes",name:"Cojedes",description:""},
      {_id:"Delta Amacuro",name:"Delta Amacuro",description:""},
      {_id:"Caracas",name:"Caracas",description:""},
      {_id:"Falcón",name:"Falcón",description:""},
      {_id:"Guárico",name:"Guárico",description:""},
      {_id:"Lara",name:"Lara",description:""},
      {_id:"Mérida",name:"Mérida",description:""},
      {_id:"Miranda",name:"Miranda",description:""},
      {_id:"Monagas",name:"Monagas",description:""},
      {_id:"Nueva Esparta",name:"Nueva Esparta",description:""},
      {_id:"Portuguesa",name:"Portuguesa",description:""},
      {_id:"Sucre",name:"Sucre",description:""},
      {_id:"Táchira",name:"Táchira",description:""},
      {_id:"Trujillo",name:"Trujillo",description:""},
      {_id:"Vargas",name:"Vargas",description:""},
      {_id:"Yaracuy",name:"Yaracuy",description:""},
      {_id:"Zulia",name:"Zulia",description:""},
    ];
  }

  ngOnInit()
  {
    this._route.params.subscribe
    (
      params =>
      {
        let id = params.id;
        this.getUser(id);
            this.resID = id;
      }
    );
    this.empresa = new Empresa('','','','','','',this.resID);
  }

  getUser(id)
  {
    this._userService.getUser(id).subscribe
    (
      response =>
      {
        this.user = response.user;

      },
      error =>
      {
        console.log(<any>error);
      }
    )
  }

  register(form: NgForm)
  {
    if(form.valid)
    {
        this.empresa.name = form.form.value.name;
        this.empresa.rif = form.form.value.rif;
        this.empresa.telefono = form.form.value.telefono;
        this.empresa.direccion = form.form.value.direccion;
        this.empresa.estado = form.form.value.estado;
        
        this._empresaService.saveEmpresa(this.empresa).subscribe
        (
          res =>
          {
            this.asigarTipo();
          },
          error =>
          {
            console.log(error);
            this.isAlert=false;
            this.message = error.message;
            this.onIsError();

            if(error instanceof HttpErrorResponse)
            {
              if(error.status===404)
              {
                this.message = error.error.message;
              }
            }
          }
        );
    }else
    {
      this.isAlert=false;
      this.onIsError();
    }
  }

  asigarTipo()
  {
    this.user.tipo = this.tipo;

    this._userService.updateUser(this.user).subscribe
    (
      response =>
      {
        if(response.user)
        {
          this.update_user = response.user;
          this.loginRedirect();
        }
      },
      error =>
      {
        console.log(error);
        this.isAlert=false;
        this.message = error.message;
        this.onIsError();
        console.log(<any>error);
      }
    );

  }

  onIsError()
  {
    this.isError=true;
    window.scrollTo(0, 0);

  }

  closeAlertError()
  {
    this.isError=false;
  }

  loginRedirect()
  {
    this.spinner.show();

      setTimeout
      (
        () =>
        {
          this.spinner.hide();
          var actualRoute = window.location.origin;
          window.location.replace(actualRoute+'/perfil/'+this.resID);
        },
        3000
      );
  }

  goBack() { 
     this._location.back(); 
    }
}
