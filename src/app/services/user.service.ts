import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService{
	public url:string;
	private isUserLoggedIn;
  	public usserLogged:User;

	constructor
	(
		private _http: HttpClient
	)
	{
		this.url = Global.url;
		this.isUserLoggedIn = false;
	}

	setUserLoggedIn(user:User)
	{
		this.isUserLoggedIn = true;
		this.usserLogged = user;
		localStorage.setItem('currentUser', JSON.stringify(user));
	}

	getUserLoggedIn() {
		return JSON.parse(localStorage.getItem('currentUser'));
	}

	saveUser(user: User): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-user', params, {headers: headers});
	}

	getUsers(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'users', {headers: headers});
	}

	getUser(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'user/'+id, {headers: headers});
	}

	getUsersExcept(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'users/'+id, {headers: headers});
	}

	getUserImg(img): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'get-image-user/'+img, {headers: headers});
	}

	deleteUsers(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'deleteUsers/'+id, {headers: headers});
	}

	deleteUser(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'user/'+id, {headers: headers});
	}
	
	updateUser(user): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'user/'+user._id, params, {headers: headers});
	}

}