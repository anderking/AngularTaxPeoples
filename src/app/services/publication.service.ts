import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../models/publication';
import { Global } from './global';

@Injectable()
export class PublicationService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	savePublication(publication: Publication): Observable<any>{
		let params = JSON.stringify(publication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-publication', params, {headers: headers});
	}

	getPublications(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'publications', {headers: headers});
	}

	getPublicationsUser(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'publications/'+id, {headers: headers});
	}

	getPublication(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'publication/'+id, {headers: headers});
	}

	deletePublication(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'publication/'+id, {headers: headers});
	}

	updatePublication(publication): Observable<any>{
		let params = JSON.stringify(publication);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'publication/'+publication._id, params, {headers: headers});
	}

}