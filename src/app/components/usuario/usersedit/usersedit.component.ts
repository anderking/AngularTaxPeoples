import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Rol } from '../../../models/rol';
import {NgForm} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usersedit',
  templateUrl: './usersedit.component.html',
  styleUrls: ['./usersedit.component.css'],
  providers:[UserService]

})

export class UserseditComponent implements OnInit {

	public user: User;
	public update_user;
	public tipo:string;
	public type:string = "password";
	public roles:Rol[];
    public show:boolean = false;
	public message:string;
	public isError:boolean = false;
	public isAlert:boolean = false;

	constructor
	(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
	)
	{
		this.roles=
		[
			{_id:"",name:"Seleccione un Rol"},
			{_id:"miembro",name:"Miembro"},
			{_id:"cliente",name:"Cliente"},
		];	
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
			}
		);
	}

	getUser(id)
	{
		this._userService.getUser(id).subscribe
		(
			response =>
			{
				this.user = response.user;
				this.tipo = this.user.tipo;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}


	update(form: NgForm)
	{
		if(form.valid)
		{
			this.user.tipo = form.form.value.tipo;

			this._userService.updateUser(this.user).subscribe
			(
				response =>
				{
					if(response.user)
					{
						this.update_user = response.user;
						this.getUser(this.update_user._id);
						this.message  = response.message;
						this.isAlert = true;
						this.onIsError();

					}
					else
					{
						this.message  = response.message;
						this.isAlert = false;
						this.onIsError();

					}
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
							console.log(error);
							this.isAlert = false;
							this.onIsError();
						}

						if(error.status===500)
						{
							this.message = error.error.message;
							console.log(error);
							this.isAlert = false;
							this.onIsError();
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
