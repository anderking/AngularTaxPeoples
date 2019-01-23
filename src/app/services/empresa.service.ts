import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Empresa } from '../models/empresa';
import { Global } from './global';

@Injectable()
export class EmpresaService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	saveEmpresa(empresa: Empresa): Observable<any>{
		let params = JSON.stringify(empresa);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-empresa', params, {headers: headers});
	}

	getEmpresas(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'empresas', {headers: headers});
	}

	getEmpresa(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'empresa/'+id, {headers: headers});
	}

	deleteEmpresa(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'empresa/'+id, {headers: headers});
	}

	updateEmpresa(empresa): Observable<any>{
		let params = JSON.stringify(empresa);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'empresa/'+empresa._id, params, {headers: headers});
	}

}