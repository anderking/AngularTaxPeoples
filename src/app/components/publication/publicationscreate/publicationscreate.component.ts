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
  selector: 'app-publicationscreate',
  templateUrl: './publicationscreate.component.html',
  styleUrls: ['./publicationscreate.component.css']
})

export class PublicationscreateComponent implements OnInit {
	
	public publication: Publication;
	public save_publication: any;
	public categorias: Categoria;
	public rutas: Ruta;
  	public categoriaSelected:any;
	public rutaSelected:any;

	public isFileChosen:boolean = false;
	public fileName: string = '';
	public filesToUpload: Array<File>;

	public title: string;
	public description: string;
	public tarifa:string;
	public image: string;
	public vista: string;
	public create_at: any;
	public resID:string = localStorage.getItem('resID');
	public rolID:string=localStorage.getItem('rolID');
	
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
	)
	{
		var fecha = new Date();
	  	this.create_at = new Date(fecha).toISOString().split("T")[0];
		this.publication = new Publication('','','','','','',this.create_at,'','',this.resID);
	}

	ngOnInit()
	{
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
					//this.categoriaID = this.categorias[0]._id;
					this.categoriaID = "";
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
					//this.rutaID = this.rutas[0]._id;
					this.rutaID = "";
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.publication.title = form.form.value.title;
			this.publication.description = form.form.value.description;
			this.publication.tarifa = form.form.value.tarifa;
			this.publication.categoriaID = form.form.value.categoriaID;
			this.publication.rutaID = form.form.value.rutaID;
			
			this._publicationService.savePublication(this.publication).subscribe
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
								//this.publication.image = form.form.value.image;
								this.save_publication = result.publication;
								this.isAlert=true;
								this.message = "Publicación Creada Correctamente";
								form.reset();
								$('#inputTitle').focus();
								this.onIsError();
								
							}
						);
					}
					else
					{
						this.save_publication = response.publication;
						this.isAlert=true;
						this.message = response.message;
						form.reset();
						$('#inputTitle').focus();
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
