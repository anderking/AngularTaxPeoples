import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Categoria } from '../../../models/categoria';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editempresa',
  templateUrl: './editempresa.component.html',
  styleUrls: ['./editempresa.component.css'],
  providers:[UserService,EmpresaService]
})
export class EditempresaComponent implements OnInit {

	public user: User;
	public empresa: Empresa;
	public categoria : Categoria[];
	public update_empresa;
	public message:string;
	public isError:boolean = false;
	public isAlert:boolean = false;

	constructor
	(
		private _userService: UserService,
		private _empresaService: EmpresaService,
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
				this.getEmpresa(id);
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

	getEmpresa(id)
	{
		this._empresaService.getEmpresa(id).subscribe
		(
			response =>
			{
				this.empresa = response.empresa[0];
				console.log(this.empresa);
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
			this._empresaService.updateEmpresa(this.empresa).subscribe
			(
				response =>
				{
					if(response.empresa)
					{
						this.update_empresa = response.empresa;
						this.isAlert=true;
						this.message  = response.message;
						this.onIsError();
					}
					else
					{
						this.isAlert=false;
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