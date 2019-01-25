import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { LikeService } from '../../../services/like.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-publicationsshow',
  templateUrl: './publicationsshow.component.html',
  styleUrls: ['./publicationsshow.component.css']
})

export class PublicationsshowComponent implements OnInit {
	
	public user: User;
	public publication: Publication;
	public url: string;
	public confirm: boolean;
	public resID:string;
	public likes:number=0;
	public likebool:boolean=false;

	constructor
	(
		private _publicationService: PublicationService,
		private _userService: UserService,
		private _likeService: LikeService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location
	)
	{
		this.url = Global.url;
    	this.confirm = false;
		this.resID = localStorage.getItem('resID');
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPublication(id);
				this.getLikesPublication(id);
				this.islike(id)
			}
		);
		this.getUser(this.resID);

	}

	getPublication(id)
	{
		this._publicationService.getPublication(id).subscribe
		(
			response =>
			{
				this.publication = response.publication;
				console.log(this.publication);
				this.publication.create_at = this.publication.create_at.split("T")[0];;

			},
			error =>
			{
				console.log(<any>error);
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
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getLikesPublication(id)
	{
		this._likeService.getLikesPublication(id).subscribe
		(
			response =>
			{
				this.likes = response.likesPublication.length;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	deletePublication(id){
		this._publicationService.deletePublication(id).subscribe(
			response =>
			{
				if(response.publication)
				{
					if(this.user.tipo=="miembro")
					{
						this._router.navigate(['/publicaiones/user/'+this.user._id+'']);
					}

					if(this.user.tipo=="admin")
					{
						this._router.navigate(['/publicaciones/']);
					}
				}
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	setConfirm(confirm)
	{
		this.confirm = confirm;
	}
	
	goBack() { 
     this._location.back(); 
    }

    islike(id){
    	this._likeService.isLike(this.resID,id).subscribe(
			response =>
			{
				if(response)
          			this.likebool=true;
          		else
          			this.likebool=false;

          		console.log(this.likebool);
					
			},
			error =>
			{
				console.log(<any>error);
			}
		);
    }

    upLike(){
    	this._likeService.upLike(this.publication._id,this.resID).subscribe(
    		response =>
			{
				this.getLikesPublication(this.publication._id);
				this.islike(this.publication._id);

			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }

    disLike(){
    	this._likeService.disLike(this.publication._id,this.resID).subscribe(
    		response =>
			{
				this.getLikesPublication(this.publication._id);
				this.islike(this.publication._id);
			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }



}
