import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})

export class RutasComponent implements OnInit {
	
	public rutas: any;
	public resID: string;
	public url: string;
	public total:number=0;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;
	public page:number=1;
	public failedConect:string;
	public filterRutas:any = "";


	constructor
	(
		private _rutaService: RutaService,
		private _location: Location,
	)
	{
	}
	ngOnInit()
	{
		this.url = Global.url;
		this.getRutas();
		this.resID = localStorage.getItem('resID');

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
					this.total = this.rutas.length;
				}
			},
			error => 
			{
				console.log(error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		);
	}

	delete(id)
	{
		this._rutaService.deleteRuta(id).subscribe
		(
			response =>
			{
				this.message = response.message;
				this.isAlert = true;
				this.onIsError();
				this.getRutas();
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
			},
			error =>
			{
				this.message = error.message;
				this.isAlert = false;
				this.onIsError();
			}
		);
	}

	deleterutas()
	{
		this._rutaService.deleteRutas().subscribe
		(
			response =>
			{
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
				$('#delete-users').css('display','none');
				this.message = response.message;
				this.isAlert = true;
				this.onIsError();
				this.getRutas();

			},
			error =>
			{
				this.message = error.message;
				this.isAlert = false;
				this.onIsError();
			}
		);
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
