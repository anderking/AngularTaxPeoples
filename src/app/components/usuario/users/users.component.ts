import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService,PublicationService]

})
export class UsersComponent implements OnInit {
	
	public users: any;
	public publicationsUser: any;
	public total:number=0;
	public resID:string;
	public url: string;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;

	constructor
	(
		private _userService: UserService,
		private _publicationService: PublicationService,
		private _router: Router,

	)
	{
	}
	ngOnInit()
	{
		this.resID = localStorage.getItem('resID');
		this.url = Global.url;
		this.getUserAll(this.resID);
	}

	getPublicationsUser(id)
	{
		this._publicationService.getPublicationsUser(id).subscribe
		(
			response =>
			{
				this.publicationsUser = response.publicationsUser;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getUserAll(id)
	{
		this._userService.getUsersExcept(id).subscribe
		(
			response =>
			{
				if(response.users)
				{
					this.users = response.users;
					for (var i = 0; i < this.users.length; i++)
					{
						this.getPublicationsUser(this.users[i]._id);
					}
					this.total = this.users.length;
				}
			},
			error => 
			{
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
				this.getUserAll(this.resID);
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
				this.getUserAll(this.resID);

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

}
