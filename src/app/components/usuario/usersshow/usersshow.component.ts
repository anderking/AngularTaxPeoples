import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../../services/global';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-usersshow',
  templateUrl: './usersshow.component.html',
  styleUrls: ['./usersshow.component.css'],
  providers: [UserService,ProjectService]
})
export class UsersshowComponent implements OnInit {

	public user: User;
	public projects: any;
	public total:string;
	public url: string;

	constructor
	(
		private _userService: UserService,
		private _projectService: ProjectService,
		private _route: ActivatedRoute,
		private _location: Location
		
	)
	{
		this.url = Global.url;

	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
				this.getProjectsAll(id);
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
				console.log(this.user);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getProjectsAll(id){
		this._projectService.getProjectsUser(id).subscribe
		(
			response =>
			{
				if(response.projects)
				{
					this.projects = response.projects;
					console.log(this.projects);
					this.total = this.projects.length;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}
	goBack() { 
     this._location.back(); 
    }
}
