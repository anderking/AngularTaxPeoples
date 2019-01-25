import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LikeService } from '../../../services/like.service';

@Component({
  selector: 'app-publicationsuser',
  templateUrl: './publicationsuser.component.html',
  styleUrls: ['./publicationsuser.component.css'],
})

export class PublicationsuserComponent implements OnInit {
	
	public publicationsUser: any;
	public url:string;
	public total:number=0;
	public resID:string;

	constructor
	(
		private _publicationService: PublicationService,
		private _route: ActivatedRoute,
		private _likeService: LikeService,

	)
	{
		this.url = Global.url;
		this.resID = localStorage.getItem('resID');
	}

	ngOnInit() {
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPublicationsUser(id);
			}
		);
	}

	getPublicationsUser(id){
		this._publicationService.getPublicationsUser(id).subscribe
		(
			response =>
			{
				if(response.publicationsUser)
				{
					this.publicationsUser = response.publicationsUser;
					this.total = this.publicationsUser.length;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}

}
