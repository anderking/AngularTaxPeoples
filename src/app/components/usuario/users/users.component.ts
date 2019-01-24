import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';

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
	)
	{
	}
	ngOnInit()
	{
		this.resID = localStorage.getItem('resID');
		this.url = Global.url;
		this.getUserAll();
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

	getUserAll()
	{
		this._userService.getUsers().subscribe
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
				this.getUserAll();
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
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
