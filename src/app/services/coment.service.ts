import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Coment } from '../models/coment';
import { Global } from './global';

@Injectable()
export class ComentService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	saveComent(coment: Coment): Observable<any>{
		let params = JSON.stringify(coment);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-coment', params, {headers: headers});
	}

	getComents(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'coments', {headers: headers});
	}

	getComent(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'coment/'+id, {headers: headers});
	}

	getcomentsPublication(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'comentsPublication/'+id, {headers: headers});
	}

	deleteComent(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'coment/'+id, {headers: headers});
	}

	updateComent(coment): Observable<any>{
		let params = JSON.stringify(coment);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'coment/'+coment._id, params, {headers: headers});
	}

}