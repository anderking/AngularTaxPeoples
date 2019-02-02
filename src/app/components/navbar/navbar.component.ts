import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user'; //Importo el modelo
import { Global } from '../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	
	public user: User;
	public isLogged:any;
	public resID:string;
	public tipo:string;
	public rutaActual:string;
	public url: string;
	
	constructor
	(
		public _authService: AuthService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
	)
	{
		this.rutaActual = this._router.url;
		this.url = Global.url;
	}

	ngOnInit()
	{
	    if ( localStorage.getItem('resID') )
	    {
	      this.resID = localStorage.getItem('resID');
	      this.getUser(this.resID);
	    }
	    else
	    {
	      this._authService.logoutUserToken();
	      this._authService.logoutUserResID();
	    }

	}

	getUser(id)
	{
		this._userService.getUser(id).subscribe
		(
			response =>
			{
				this.user = response.user;
				this.tipo = response.user.tipo;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

}
