import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService,PublicationService]

})
export class UsersComponent implements OnInit {
	
	public users: any;
	public total:number=0;
	public resID:string;
	public url: string;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;
	public failedConect:string;
	public filterUsers:any="";

	constructor
	(
		private _userService: UserService,
		private _publicationService: PublicationService,
		private _router: Router,
		private _location: Location,

	)
	{
	}

	ngOnInit()
	{
		this.resID = localStorage.getItem('resID');
		this.url = Global.url;
		this.getUsers(this.resID);
	}

	getUsers(id)
	{
		this._userService.getUsersExcept(id).subscribe
		(
			response =>
			{
				if(response.users)
				{
					this.users = response.users;
					this.total = this.users.length;
				}
			},
			error => 
			{
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = "Ups!!! hay problemas para conectar con la API, probablemente no haya internet";
					}
				}
				console.log(error);
			}
		);
	}

	delete(id)
	{
		this._userService.deleteUser(id).subscribe
		(
			response =>
			{
				this.message = response.message;
				this.isAlert = true;
				this.onIsError();
				this.getUsers(this.resID);
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
				$('.modal.fade').css('display','none');
				

			},
			error =>
			{
				this.message = error.message;
				this.isAlert = false;
				this.onIsError();
			}
		);
	}

	deleteUsers()
	{
		this._userService.deleteUsers(this.resID).subscribe
		(
			response =>
			{
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
				$('#delete-users').css('display','none');
				this.message = response.message;
				this.isAlert = true;
				this.onIsError();
				this.getUsers(this.resID);

			},
			error =>
			{
				this.message = error.message;
				this.isAlert = false;
				this.onIsError();
			}
		);
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
	
	goBack()
	{ 
     this._location.back(); 
    }
}
