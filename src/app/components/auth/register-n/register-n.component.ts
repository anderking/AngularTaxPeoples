import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { Categoria } from '../../../models/categoria';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
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

	public name:string;
	public cedula:string;
	public fechaNacimiento:string;
	public telefono:string;
	public direccion:string;
	public sexo:string;
	public edoCivil:string;
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
    	private _location: Location,

	)
	{		
		this.categoria=
		[
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

		var fecha = new Date();
		var fecha2 = fecha.setDate(fecha.getDate() - 1);
  		this.fechaActual = new Date(fecha2).toISOString().split("T")[0];
	}

	ngOnInit()
	{
		this.categoriaSelected="";
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
	      		this.resID = id;
			}
		);
		this.persona = new Persona('','','','','','','','','',this.resID);
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
	        var actualRoute = window.location.origin;
	        window.location.replace(actualRoute+'/perfil/'+this.resID);
	      },
	      3000
	    );
	}

	goBack()
	{ 
		this._location.back(); 
    }
    
}
