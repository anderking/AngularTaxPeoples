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
	public total:number=0;
	public resID:string;
	public url: string;

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
				if(this.user.tipo=="cliente" || this.user.tipo=="admin")
				{
					this.persona = response.persona[0];
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
				if(this.user.tipo=="miembro")
				{
					this.empresa = response.empresa[0];
				}
			},
			error =>
			{
				console.log(<any>error);
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
			}
		)
	}

	goBack() { 
     this._location.back(); 
    }
}
