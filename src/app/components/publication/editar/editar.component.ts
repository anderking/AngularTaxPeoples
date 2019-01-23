import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditarComponent implements OnInit {
	
	public user: User;
	public title: string;
	public project: Project;
	public update_project;
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;
	public resID:string;


	constructor
	(
		private _projectService: ProjectService,
		private _userService: UserService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,
		private _router: Router
	)
	{
		this.title = "Editar proyecto";
		this.url = Global.url;
		this.resID = localStorage.getItem('resID');

	}

	public setStatus(status){
		this.status=status;
	}
	
	public getStatus(){
		return this.status;
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getProject(id);
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
				console.log(this.project);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
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
	
	onSubmit()
	{
		this._projectService.updateProject(this.project).subscribe
		(
			response =>
			{
				if(response.project)
				{	// Subir la imagen
					if(this.filesToUpload)
					{
						this._uploadService.makeFileRequest(Global.url+"upload-image-project/"+response.project._id, [], this.filesToUpload, 'image')
						.then
						(
							(result:any) =>
							{
								this.update_project = result.project;
								this.status = 'success';
								this._router.navigate(['/proyectos/show/'+this.update_project._id]);
							}
						);
					}
					else
					{
						this.update_project = response.project;
						this.status = 'success';
						this._router.navigate(['/proyectos/show/'+this.update_project._id]);
					}
				}
				else
				{
					this.status = 'failed';
				}
			},
			error =>
			{
				console.log(<any>error);
			}
		);
	}

	fileChangeEvent(fileInput: any)
	{
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
