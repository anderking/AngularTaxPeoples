import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rutasshow',
  templateUrl: './rutasshow.component.html',
  styleUrls: ['./rutasshow.component.css']
})
export class RutasshowComponent implements OnInit {

	public ruta: Ruta;

	constructor
	(
		private _rutaService: RutaService,
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
				this.getRuta(id);
			}
		);
	}

	getRuta(id)
	{
		this._rutaService.getRuta(id).subscribe
		(
			response =>
			{
				this.ruta = response.ruta;
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
