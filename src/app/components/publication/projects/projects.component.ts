import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit {
	public projects: any;
	public user: any;
	public url:string;
	public total:number=0;
	public userID:string;

	constructor
	(
		private _projectService: ProjectService,
		private _userService: UserService,
		private _route: ActivatedRoute,
    	private _router: Router,


	)
	{
		this.url = Global.url;
		this.userID = localStorage.getItem('resID');
	}
	ngOnInit()
	{
		this.getUser(this.userID);
		this.getProjectsAll();
	}

	getUser(id)
	{
		this._userService.getUser(id).subscribe
		(
			response =>
			{
				this.user = response.user;
				if(this.user.tipo=="member")
      				this._router.navigate(['proyectos/user/'+this.userID]);
					
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getProjectsAll()
	{
		this._projectService.getProjects().subscribe
		(
			response =>
			{
				if(response.projects)
				{
					this.projects = response.projects;
					this.total = this.projects.length;
				}
			},
			error => 
			{
				console.log(error);
			}
		);
	}


}
