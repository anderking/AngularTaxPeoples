import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-t',
  templateUrl: './register-t.component.html',
  styleUrls: ['./register-t.component.css']
})
export class RegisterTComponent implements OnInit {
	public resID:string;

	constructor() { }

	ngOnInit(){
		this.resID = localStorage.getItem('resID');
	}

}
