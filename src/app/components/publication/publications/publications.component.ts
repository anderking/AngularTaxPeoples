import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LikeService } from '../../../services/like.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
})

export class PublicationsComponent implements OnInit {
	
	public publications: any;
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
			}
		);
		this.getPublications();
	}

	getPublications(){
		this._publicationService.getPublications().subscribe
		(
			response =>
			{
				if(response.publications)
				{
					this.publications = response.publications;
					this.total = this.publications.length;
					console.log(this.publications,this.total);
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}

}
