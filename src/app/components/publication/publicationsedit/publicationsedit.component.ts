import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-publicationsedit',
  templateUrl: './publicationsedit.component.html',
  styleUrls: ['./publicationsedit.component.css']
})

export class PublicationseditComponent implements OnInit {
	
	public publication: Publication;
	public update_publication: any;
	public categorias: Categoria;
	public rutas: Ruta;
  	public categoriaSelected:any;
	public rutaSelected:any;

	public isFileChosen:boolean = false;
	public fileName: string = '';
	public filesToUpload: Array<File>;

	public resID:string = localStorage.getItem('resID');
	public categoriaID: string;
	public rutaID: string;

	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;

	constructor
	(
		private _publicationService: PublicationService,
		private _categoriaService: CategoriaService,
		private _rutaService: RutaService,
		private _uploadService: UploadService,
		private _location: Location,
		private _router: Router,
		private _route: ActivatedRoute,
	)
	{
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPublication(id);
			}
		);
		this.getCategorias();
		this.getRutas();
	}

	getPublication(id)
	{
		this._publicationService.getPublication(id).subscribe
		(
			response =>
			{
				this.publication = response.publication;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
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

	update(form: NgForm)
	{
		if(form.valid)
		{
			
			this._publicationService.updatePublication(this.publication).subscribe
			(
				response =>
				{
					if(this.filesToUpload)
					{
						this._uploadService.makeFileRequest(Global.url+"upload-image-publication/"+response.publication._id, [], this.filesToUpload, 'image')
						.then
						(
							(result:any) =>
							{
								this.update_publication = result.publication;
								this.isAlert=true;
								this.message = "Publicación Actualizada Correctamente";
								this.getPublication(this.update_publication._id)
								this.onIsError();
								
							}
						);
					}
					else
					{
						this.update_publication = response.publication;
						this.isAlert=true;
						this.message = response.message;
						this.getPublication(this.update_publication._id)
						this.onIsError();
					}
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
	  /*this.filesToUpload = <Array<File>>event.target.files;*/
	}
	goBack()
	{ 
     this._location.back(); 
    }
}
