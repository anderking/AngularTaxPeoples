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
	public url: string;
	public isFileChosen:boolean = false;
	public fileName: string = '';

	constructor
	(
		private _userService: UserService,
		private _personaService: PersonaService,
		private _empresaService: EmpresaService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _authService: AuthService,
		private _uploadService: UploadService,
		private spinner: NgxSpinnerService

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
				this.getPersona(id);
				this.getEmpresa(id);

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
				if(this.rolID=="cliente")
				{
					console.log("Persona: ",response.persona)
					if(response.persona.length==0)
					{
						this._router.navigate(["/register/"+this.resID]);
					}
					else
					{
						this.persona = response.persona[0];
						localStorage.setItem('perID', this.persona._id);
						this.persona.fechaNacimiento = this.persona.fechaNacimiento.split("T")[0];;
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
				console.log("Empresa: ",response.empresa)
					if(response.empresa.length==0)
					{
						this._router.navigate(["/register/"+this.resID]);
					}
					else
					{
						this.empresa = response.empresa[0];
						localStorage.setItem('empID', this.empresa._id);
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
									//this.getUser(this.user._id);
									window.location.replace('http://localhost:4200/perfil/'+localStorage.getItem('resID'));
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

	preUpload(event: any){
	  let file = event.target.files[0];
	  if (event.target.files.length > 0)
	  {
	  	this.isFileChosen = true;
	  }        
	  this.fileName = file.name;
	  this.filesToUpload = <Array<File>>event.target.files;

	}

}
