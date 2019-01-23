import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Categoria } from '../../../models/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  )
  {    
    this.categoria= [
      {id:"",name:"Seleccione un Estado"},
      {id:"Amazonas",name:"Amazonas"},
      {id:"Anzoátegui",name:"Anzoátegui"},
      {id:"Apure",name:"Apure"},
      {id:"Aragua",name:"Aragua"},
      {id:"Barinas",name:"Barinas"},
      {id:"Bolívar",name:"Bolívar"},
      {id:"Carabobo",name:"Carabobo"},
      {id:"Cojedes",name:"Cojedes"},
      {id:"Delta Amacuro",name:"Delta Amacuro"},
      {id:"Caracas",name:"Caracas"},
      {id:"Falcón",name:"Falcón"},
      {id:"Guárico",name:"Guárico"},
      {id:"Lara",name:"Lara"},
      {id:"Mérida",name:"Mérida"},
      {id:"Miranda",name:"Miranda"},
      {id:"Monagas",name:"Monagas"},
      {id:"Nueva Esparta",name:"Nueva Esparta"},
      {id:"Portuguesa",name:"Portuguesa"},
      {id:"Sucre",name:"Sucre"},
      {id:"Táchira",name:"Táchira"},
      {id:"Trujillo",name:"Trujillo"},
      {id:"Vargas",name:"Vargas"},
      {id:"Yaracuy",name:"Yaracuy"},
      {id:"Zulia",name:"Zulia"},
    ];
  }

  ngOnInit()
  {
    this.resID = localStorage.getItem('resID');
    this.empresa = new Empresa('','','','','','',this.resID);
    this._route.params.subscribe
    (
      params =>
      {
        let id = params.id;
        this.getUser(id);
            this.resID = id;
      }
    );
  }

  getUser(id)
  {
    this._userService.getUser(id).subscribe
    (
      response =>
      {
        this.user = response.user;
        console.log(this.user);

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
            localStorage.setItem('empID', res.empresa._id);
            this.asigarTipo();
          },
          err =>
          {
            console.log(err);
            this.isAlert=false;
            this.message = err.message;
            this.onIsError();

            if(err instanceof HttpErrorResponse)
            {
              if(err.status===404)
              {
                this.message = err.error.message;
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
          window.location.replace('http://localhost:4200/perfil/'+localStorage.getItem('resID'));
        },
        3000
      );
  }
}
