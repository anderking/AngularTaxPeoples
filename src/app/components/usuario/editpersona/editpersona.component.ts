import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { Categoria } from '../../../models/categoria';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editpersona',
  templateUrl: './editpersona.component.html',
  styleUrls: ['./editpersona.component.css'],
  providers:[UserService,PersonaService]

})
export class EditpersonaComponent implements OnInit {

	public user: User;
	public persona: Persona;
	public categoria : Categoria[];
	public update_persona;
	public fechaActual:any;
	public message:string;
	public isError:boolean = false;
	public isAlert:boolean = false;


	constructor
	(
		private _userService: UserService,
		private _personaService: PersonaService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
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
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
				this.getPersona(id);
			}
		);
		var fecha = new Date();
		var fecha2 = fecha.setDate(fecha.getDate() - 1);
  		this.fechaActual = new Date(fecha2).toISOString().split("T")[0];
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

	getPersona(id)
	{
		this._personaService.getPersona(id).subscribe
		(
			response =>
			{
				this.persona = response.persona[0];
				this.persona.fechaNacimiento = this.persona.fechaNacimiento.split("T")[0];
				console.log(this.persona);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	update(form: NgForm)
	{
		if(form.valid)
		{
			var fechaActual = new Date();
			var fechaForm = new Date(form.form.value.fechaNacimiento);
			var fechaForm2 = new Date(fechaForm.setDate(fechaForm.getDate() + 1));

			if(fechaForm2<fechaActual)
			{
				this._personaService.updatePersona(this.persona).subscribe
				(
					response =>
					{
						if(response.persona)
						{
							this.update_persona = response.persona;
							this.isAlert=true;
							this.message  = response.message;
							this.onIsError();

						}
						else
						{
							this.isAlert=true;
							this.message  = response.message;
							this.onIsError();

						}
					},
					error =>
					{
						this.isAlert=false;
						console.log(error);
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
			}else{
				window.scrollTo(0, 0);
				this.isAlert=false;
				this.message = "La fecha de nacimiento no puede ser mayor que la fecha actual";
			}
		}else
		{
			this.onIsError();
		}
		
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
	
	goBack()
	{ 
     this._location.back(); 
    }

}