import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ruta } from '../models/ruta';
import { Global } from './global';

@Injectable()
export class RutaService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	saveRuta(ruta: Ruta): Observable<any>{
		let params = JSON.stringify(ruta);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-ruta', params, {headers: headers});
	}

	getRutas(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'rutas', {headers: headers});
	}

	getpublicationsRuta(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'publicationsRuta/'+id, {headers: headers});
	}

	getRuta(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'ruta/'+id, {headers: headers});
	}

	deleteRuta(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'ruta/'+id, {headers: headers});
	}

	deleteRutas(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'deleteRutas', {headers: headers});
	}

	updateRuta(ruta): Observable<any>{
		let params = JSON.stringify(ruta);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'ruta/'+ruta._id, params, {headers: headers});
	}

}