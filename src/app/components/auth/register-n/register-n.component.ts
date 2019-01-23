import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { Categoria } from '../../../models/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-n',
  templateUrl: './register-n.component.html',
  styleUrls: ['./register-n.component.css'],
  providers: [UserService,PersonaService]
})

export class RegisterNComponent implements OnInit {

	public user:User;
	public update_user;
	public persona:Persona;
	public email:string;
	public password:string;
  	public tipo:string="cliente";
  	public fechaActual:any;
  	public categoria:Categoria[];
  	public categoriaSelected:string;
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
		private _personaService: PersonaService,
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

		var fecha = new Date();
		var fecha2 = fecha.setDate(fecha.getDate() - 1);
  		this.fechaActual = new Date(fecha2).toISOString().split("T")[0];
	}

	ngOnInit()
	{
		this.categoriaSelected="";
		this.resID = localStorage.getItem('resID');
		this.persona = new Persona('','','','','','','','','',this.resID);
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
			var fechaActual = new Date();
			var fechaForm = new Date(form.form.value.fechaNacimiento);
			var fechaForm2 = new Date(fechaForm.setDate(fechaForm.getDate() + 1));

			if(fechaForm2<fechaActual)
			{
				this.persona.name = form.form.value.name;
				this.persona.cedula = form.form.value.cedula;
				this.persona.telefono = form.form.value.telefono;
				this.persona.direccion = form.form.value.direccion;
				this.persona.estado = form.form.value.estado;
				this.persona.sexo = form.form.value.sexo;
				this.persona.edoCivil = form.form.value.edoCivil;
				this.persona.fechaNacimiento = form.form.value.fechaNacimiento;
				
				this._personaService.savePersona(this.persona).subscribe
				(
					res =>
					{
						localStorage.setItem('perID', res.persona._id);
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
								this.onIsError();
							}
						}
					}
				);
			}else
			{
				window.scrollTo(0, 0);
				this.isAlert=false;
				this.onIsError();
				this.message = "La fecha de nacimiento no puede ser mayor que la fecha actual";
			}
		}else
		{
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
				this.message = error.message;
				this.isAlert = false;
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
