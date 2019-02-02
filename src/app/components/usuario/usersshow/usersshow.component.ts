import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Persona } from '../../../models/persona';
import { PersonaService } from '../../../services/persona.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../../services/global';
import {Location} from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usersshow',
  templateUrl: './usersshow.component.html',
  styleUrls: ['./usersshow.component.css'],
})

export class UsersshowComponent implements OnInit {

	public user: User;
	public persona: Persona;
	public empresa: Empresa;
	public publicationsUser: any;
	public publicactionUserID:string;
	public total:number=0;
	public totalInfo:number=0;
	public resID:string;
	public url: string;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;
	public failedConect:string;

	constructor
	(
		private _userService: UserService,
		private _publicationService: PublicationService,
		private _personaService: PersonaService,
		private _empresaService: EmpresaService,
		private _route: ActivatedRoute,
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
				this.publicactionUserID = id;
				this.getUser(id);
				this.getPublicationsUser(id);
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
				if(this.user.tipo=="cliente")
				{
					this.getPersona(id);
				}else if(this.user.tipo=="miembro")
				{
					this.getEmpresa(id);
				}
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	getPersona(id)
	{
		this._personaService.getPersona(id).subscribe
		(
			response =>
			{
				if(this.user.tipo=="cliente" || this.user.tipo=="admin")
				{
					this.persona = response.persona;
					if(this.persona) this.totalInfo = 1;
				}
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	getEmpresa(id)
	{
		this._empresaService.getEmpresa(id).subscribe
		(
			response =>
			{
				if(this.user.tipo=="miembro")
				{
					this.empresa = response.empresa;
					if (this.empresa) this.totalInfo = 1;
				}
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	getPublicationsUser(id)
	{
		this._publicationService.getPublicationsUser(id).subscribe
		(
			response =>
			{
				this.publicationsUser = response.publicationsUser;
				this.total = this.publicationsUser.length;
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	delete(id)
	{
		this._publicationService.deletePublication(id).subscribe
		(
			response =>
			{
				this.message = response.message;
				this.isAlert = true;
				this.onIsError();
				this.getPublicationsUser(this.publicactionUserID);
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
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

	goBack() { 
     this._location.back(); 
    }
}
