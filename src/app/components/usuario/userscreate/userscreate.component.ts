import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Rol } from '../../../models/rol';
import {NgForm} from '@angular/forms';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userscreate',
  templateUrl: './userscreate.component.html',
  styleUrls: ['./userscreate.component.css']
})

export class UserscreateComponent implements OnInit {

	public user:User;
	public email:string;
	public password:string;
	public description:string;
  	public tipo:string;
  	public save_user:any;
  	public roles:Rol[];
	public type:string = "password";
	public show:boolean = false;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;

	constructor
	(
		private _router: Router,
		private _userService: UserService,
		private _location: Location
	)
	{
		this.user = new User('','','','','','','');
		this.roles=
		[
			{_id:"miembro",name:"Miembro"},
			{_id:"cliente",name:"Cliente"},
		];
	}

	ngOnInit()
	{
		this.tipo="";
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.user.tipo = form.form.value.tipo;

			this._userService.saveUser(this.user).subscribe
			(
				response =>
				{
					this.save_user = response.user;
					form.reset();
					this.message = response.message;
					this.isAlert=true;
					this.onIsError();
				},
				error =>
				{
					this.message = error.message;
					console.log(error);
					this.isAlert = false;
					this.onIsError();

					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
						}
					}
				}
			);
		}else
		{
			this.onIsError();
		}
	}

	onIsError()
	{
		this.isError=true;
		window.scrollTo(0, 0);

	}

	closeAlertError()
	{
		this.isError=false;
	}

	toggleShow()
    {
        this.show = !this.show;
        if (this.show){
            this.type = "text";
        }
        else {
            this.type = "password";
        }
    }

	goBack()
	{ 
     this._location.back(); 
    }
}
