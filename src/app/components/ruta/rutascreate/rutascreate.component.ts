import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import {NgForm} from '@angular/forms';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rutascreate',
  templateUrl: './rutascreate.component.html',
  styleUrls: ['./rutascreate.component.css']
})

export class RutascreateComponent implements OnInit {

	public ruta: Ruta;
	public name:string;
	public description:string;
	public save_ruta;
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
		this.ruta = new Ruta('','','');
	}

	ngOnInit()
	{
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.ruta.name = form.form.value.name;
			this.ruta.description = form.form.value.description;

			this._rutaService.saveRuta(this.ruta).subscribe
			(
				response =>
				{
					if(response.ruta)
					{
						this.save_ruta = response.ruta;
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
