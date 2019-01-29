import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Like } from '../models/like';
import { Global } from './global';

@Injectable()
export class LikeService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	upLike(publicationID:string, userID:string): Observable<any>
	{
		return this._http.post(this.url+'like/'+publicationID, {publicationID: publicationID, userID: userID});
	}

	disLike(publicationID:string, userID:string): Observable<any>
	{
		return this._http.put(this.url+'like/'+publicationID, {publicationID: publicationID, userID: userID});
	}

	getLikesPublication(id): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'likesPublication/'+id, {headers: headers});
	}

	getLikesUser(id): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'likesUser/'+id, {headers: headers});
	}

	getLikes(): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'likes/', {headers: headers});
	}

	isLike(userID:string, publicationID:string): Observable<any>
	{
		return this._http.get(this.url+'islikes/'+userID+'/'+publicationID);
	}

}