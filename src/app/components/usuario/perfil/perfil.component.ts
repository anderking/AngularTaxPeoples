import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers:[UserService,UploadService,PersonaService,EmpresaService]
})
export class PerfilComponent implements OnInit {

	public user: User;
	public persona: Persona;
	public empresa: Empresa;
	public resID:string;
	public rolID:string;
	public filesToUpload: Array<File>;
	public fileName: string = '';
	public url: string;
	public isFileChosen:boolean = false;

	constructor
	(
		private _userService: UserService,
		private _personaService: PersonaService,
		private _empresaService: EmpresaService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _authService: AuthService,
		private _uploadService: UploadService,
		private spinner: NgxSpinnerService,
		private _location: Location
	)
	{
		this.url = Global.url;
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
	}

	getUser(id)
	{
		this._userService.getUser(id).subscribe
		(
			response =>
			{
				this.user = response.user;
				localStorage.setItem('rolID', this.user.tipo);
				this.rolID = localStorage.getItem('rolID');
				
				if(this.rolID=="null")
				{
					this._router.navigate(["/register/"+this.resID]);
				}else
				{
					if(this.rolID=="cliente" || this.rolID=="admin")
					{
						this.getPersona(id);
					}else if(this.rolID=="miembro")
					{
						this.getEmpresa(id);
					}
				}
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
				if(this.rolID=="cliente" || this.rolID=="admin")
				{
					if(!response.persona)
					{
						this._router.navigate(["/registerN/"+this.resID]);
					}
					else
					{
						this.persona = response.persona;
					}
				}
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
				if(this.rolID=="miembro")
				{
					if(!response.empresa)
					{
						this._router.navigate(["/registerJ/"+this.resID]);
					}
					else
					{
						this.empresa = response.empresa;
					}
				}
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	onSubmit(form: NgForm)
	{
	    if(form.valid)
	    {
			this._userService.updateUser(this.user).subscribe
			(
				response =>
				{
					if(response.user)
					{	
						if(this.filesToUpload)
						{
							this._uploadService.makeFileRequest(Global.url+"upload-image-user/"+response.user._id, [], this.filesToUpload, 'image')
							.then
							(
								(result:any) =>
								{
									var actualRoute = window.location.href;
									window.location.replace(actualRoute);
								}
							);
						}
						else
						{
							this.getUser(this.user._id);
						}
					}
				},
				error =>
				{
					console.log(<any>error);
				}
			);
	    }else{
	    	console.log("Ha ocurrido un error");
	    }
	}

	fileChangeEvent(fileInput: any)
	{
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	preUpload(event: any)
	{
	  let file = event.target.files[0];
	  if (event.target.files.length > 0)
	  {
	  	this.isFileChosen = true;
	  }        
	  this.fileName = file.name;
	  this.filesToUpload = <Array<File>>event.target.files;
	}

	goBack()
	{ 
		this._location.back(); 
    }
}
