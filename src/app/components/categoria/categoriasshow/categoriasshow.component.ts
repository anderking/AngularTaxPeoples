import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoriasshow',
  templateUrl: './categoriasshow.component.html',
  styleUrls: ['./categoriasshow.component.css']
})

export class CategoriasshowComponent implements OnInit {

	public categoria: Categoria;

	constructor
	(
		private _categoriaService: CategoriaService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
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
				this.getCategoria(id);
			}
		);
	}

	getCategoria(id)
	{
		this._categoriaService.getCategoria(id).subscribe
		(
			response =>
			{
				this.categoria = response.categoria;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}
 
	goBack()
	{ 
     this._location.back(); 
    }
}
