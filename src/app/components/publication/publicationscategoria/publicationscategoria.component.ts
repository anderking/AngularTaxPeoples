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
  selector: 'app-publicationscategoria',
  templateUrl: './publicationscategoria.component.html',
  styleUrls: ['./publicationscategoria.component.css']
})
export class PublicationscategoriaComponent implements OnInit {
	
	public publicationsCategoria: any;
	public categorias: any;
	public rutas: any;
	public url:string;
	public total:number=0;
	public resID:string;
	public rolID:string;
	public failedConect:string;


	constructor
	(
		private _publicationService: PublicationService,
		private _categoriaService: CategoriaService,
		private _rutaService: RutaService,
		private _route: ActivatedRoute,
		private _likeService: LikeService,
		private _location: Location

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
				this.getpublicationsCategoria(id);
			}
		);
		this.getCategorias();
		this.getRutas();
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

 	getpublicationsCategoria(id)
	{
		this._categoriaService.getpublicationsCategoria(id).subscribe
		(
			response =>
			{
				this.publicationsCategoria = response.publicationsCategoria;
				this.total = this.publicationsCategoria.length;
			},
			error =>
			{
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
				console.log(<any>error);
			}
		)
	}

	goBack()
	{ 
     this._location.back(); 
    }
}
