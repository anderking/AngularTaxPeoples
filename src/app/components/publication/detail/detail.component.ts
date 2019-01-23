import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { LikeService } from '../../../services/like.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({ 
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService,LikeService]
})
export class DetailComponent implements OnInit {
	
	public user: User;
	public url: string;
	public project: Project;
	public confirm: boolean;
	public resID:string;
	public likes:number=0;
	public likebool:boolean=false;

	constructor
	(
		private _projectService: ProjectService,
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
				this.getProject(id);
				this.getLikes(id);
				this.islike(id)
			}
		);
		this.getUser(this.resID);

	}

	getProject(id)
	{
		this._projectService.getProject(id).subscribe
		(
			response =>
			{
				this.project = response.project;
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

	getLikes(id)
	{
		this._likeService.getLikes(id).subscribe
		(
			response =>
			{
				this.likes = response.likes.length;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

    islike(id){
    	this._likeService.isLike(this.resID,id).subscribe(
			response =>
			{
				if(response)
          			this.likebool=true;
          		else
          			this.likebool=false;
					
			},
			error =>
			{
				console.log(<any>error);
			}
		);
    }

	deleteProject(id){
		this._projectService.deleteProject(id).subscribe(
			response => {
				if(response.project){
					if(this.user.tipo=="member")
					{
						this._router.navigate(['/proyectos/user/'+this.user._id+'']);
					}

					if(this.user.tipo=="admin")
					{
						this._router.navigate(['/proyectos/']);
					}
				}
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

    upLikes(){
    	this._likeService.upLikes(this.project._id,this.resID).subscribe(
    		response =>
			{
				this.getLikes(this.project._id);
				this.islike(this.project._id);

			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }

    disLikes(){
    	this._likeService.disLikes(this.project._id,this.resID).subscribe(
    		response =>
			{
				this.getLikes(this.project._id);
				this.islike(this.project._id);
			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }


}
