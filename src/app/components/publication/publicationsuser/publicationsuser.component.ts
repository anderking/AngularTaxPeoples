import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LikeService } from '../../../services/like.service';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publicationsuser',
  templateUrl: './publicationsuser.component.html',
  styleUrls: ['./publicationsuser.component.css'],
})

export class PublicationsuserComponent implements OnInit {
	
	public publicationsUser: any;
	public categorias: any;
	public rutas: any;
	public url:string;
	public total:number=0;
	public resID:string;
	public rolID:string;

	constructor
	(
		private _publicationService: PublicationService,
		private _categoriaService: CategoriaService,
		private _rutaService: RutaService,
		private _location: Location,
		private _route: ActivatedRoute,
		private _likeService: LikeService,

	)
	{
		this.url = Global.url;
		this.resID = localStorage.getItem('resID');
		this.rolID = localStorage.getItem('rolID');
	}

	ngOnInit() {
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPublicationsUser(id);
			}
		);
		this.getCategorias();
		this.getRutas();
	}

	getPublicationsUser(id){
		this._publicationService.getPublicationsUser(id).subscribe
		(
			response =>
			{
				if(response.publicationsUser)
				{
					this.publicationsUser = response.publicationsUser;
					this.total = this.publicationsUser.length;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}


	getCategorias()
	{
		this._categoriaService.getCategorias().subscribe
		(
			response =>
			{
				if(response.categorias)
				{
					this.categorias = response.categorias;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}

	getRutas()
	{
		this._rutaService.getRutas().subscribe
		(
			response =>
			{
				if(response.rutas)
				{
					this.rutas = response.rutas;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}

	goBack()
	{ 
     this._location.back(); 
    }
}
