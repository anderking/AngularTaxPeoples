import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Categoria } from '../models/categoria';
import { Global } from './global';

@Injectable()
export class CategoriaService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	saveCategoria(categoria: Categoria): Observable<any>{
		let params = JSON.stringify(categoria);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-categoria', params, {headers: headers});
	}

	getCategorias(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'categorias', {headers: headers});
	}

	getpublicationsCategoria(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'publicationsCategoria/'+id, {headers: headers});
	}

	getCategoria(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'categoria/'+id, {headers: headers});
	}

	deleteCategoria(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'categoria/'+id, {headers: headers});
	}

	deleteCategorias(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'deleteCategorias', {headers: headers});
	}

	updateCategoria(categoria): Observable<any>{
		let params = JSON.stringify(categoria);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'categoria/'+categoria._id, params, {headers: headers});
	}

}