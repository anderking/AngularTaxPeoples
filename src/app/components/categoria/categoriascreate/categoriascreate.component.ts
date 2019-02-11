import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoriascreate',
  templateUrl: './categoriascreate.component.html',
  styleUrls: ['./categoriascreate.component.css']
})

export class CategoriascreateComponent implements OnInit {

	public categoria: Categoria;
	public name:string;
	public description:string;
	public save_categoria;
	public message:string;
	public isError:boolean = false;
	public isAlert:boolean = false;


	constructor
	(
		private _categoriaService: CategoriaService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
	)
	{
		this.categoria = new Categoria('','','');
	}

	ngOnInit()
	{
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.categoria.name = form.form.value.name;
			this.categoria.description = form.form.value.description;

			this._categoriaService.saveCategoria(this.categoria).subscribe
			(
				response =>
				{
					if(response.categoria)
					{
						this.save_categoria = response.categoria;
						this.message  = response.message;
						this.isAlert = true;
						this.onIsError();
						form.reset()
						$('#inputName').focus();
					}
					else
					{
						this.message  = response.message;
						this.isAlert = false;
						this.onIsError();
					}
				},
				error =>
				{
					this.message = error.message;
					console.log(error);
					this.isAlert = false;
					this.onIsError();
					
					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
							console.log(error);
							this.isAlert = false;
							this.onIsError();
						}

						if(error.status===500)
						{
							this.message = error.error.message;
							console.log(error);
							this.isAlert = false;
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
 
	goBack()
	{ 
     this._location.back(); 
    }
}
