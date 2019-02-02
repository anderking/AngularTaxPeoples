import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import {NgForm} from '@angular/forms';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rutasedit',
  templateUrl: './rutasedit.component.html',
  styleUrls: ['./rutasedit.component.css']
})

export class RutaseditComponent implements OnInit {

	public ruta: Ruta;
	public update_ruta;
	public message:string;
	public isError:boolean = false;
	public isAlert:boolean = false;

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
	
	update(form: NgForm)
	{
		if(form.valid)
		{
			this._rutaService.updateRuta(this.ruta).subscribe
			(
				response =>
				{
					if(response.ruta)
					{
						this.update_ruta = response.ruta;
						this.getRuta(this.update_ruta._id);
						this.message  = response.message;
						this.isAlert = true;
						this.onIsError();
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
