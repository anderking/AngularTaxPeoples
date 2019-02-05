import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Calificacion } from '../models/calificacion';
import { Global } from './global';

@Injectable()
export class CalificacionService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	upCalificacion(calificacion): Observable<any>
	{
		let params = JSON.stringify(calificacion);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'upCalificacion', params, {headers: headers});
	}

	isCalificacion(idE,idR): Observable<any>
	{
		return this._http.get(this.url+'calificacion/'+idE+'/'+idR);
	}

	updateCalificacion(calificacion): Observable<any>{
		let params = JSON.stringify(calificacion);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'calificacion/'+calificacion._id, params, {headers: headers});
	}

	getCalificacionesR(idR): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'calificaciones/'+idR, {headers: headers});
	}

	getCalificacion(idE,idR): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'getCalificacion/'+idE+'/'+idR);
	}

}