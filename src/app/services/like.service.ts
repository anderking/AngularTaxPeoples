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

	upLikes(projectID:string, userID:string): Observable<any>
	{
		return this._http.post(this.url+'likes/'+projectID, {projectID: projectID, userID: userID});
	}

	disLikes(projectID:string, userID:string): Observable<any>
	{
		return this._http.put(this.url+'likes/'+projectID, {projectID: projectID, userID: userID});
	}

	getLikes(id): Observable<any>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'likes/'+id, {headers: headers});
	}

	isLike(userID:string, projectID:string): Observable<any>
	{
		return this._http.get(this.url+'islikes/'+userID+'/'+projectID);
	}

}