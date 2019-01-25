import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicationscreate',
  templateUrl: './publicationscreate.component.html',
  styleUrls: ['./publicationscreate.component.css']
})
export class PublicationscreateComponent implements OnInit {

	public isFileChosen:boolean = false;
	public fileName: string = '';
	public filesToUpload: Array<File>;
	

	constructor() { }

	ngOnInit() {
	}

	preUpload(event: any)
	{
	  let file = event.target.files[0];
	  if (event.target.files.length > 0)
	  {
	  	this.isFileChosen = true;
	  }        
	  this.fileName = file.name;
	  /*this.filesToUpload = <Array<File>>event.target.files;*/
	}
}
