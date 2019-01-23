import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventService {
	public url:string;
	
	constructor
	(
		private _http: HttpClient
	)
	{
		this.url = Global.url;
	}

	getEvents(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'events', {headers: headers});
	}
}
