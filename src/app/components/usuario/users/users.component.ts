import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService,ProjectService]

})
export class UsersComponent implements OnInit {
	
	public users: any;
	public projects: any;
	public total:number=0;
	public userID:string;
	public url: string;

	constructor
	(
		private _userService: UserService,
		private _projectService: ProjectService,
	)
	{
		this.userID = localStorage.getItem('resID');
		this.url = Global.url;

	}
	ngOnInit()
	{
		this.gerUserAll();
		this.getProjects(this.userID);
	}

	getProjects(id)
	{
		this._projectService.getProjectsUser(id).subscribe
		(
			response =>
			{
				this.projects = response.projects;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	gerUserAll()
	{
		this._userService.getUsers().subscribe
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
				console.log(error);
			}
		);
	}


}
