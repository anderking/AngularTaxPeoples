import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-loginspinner',
  templateUrl: './loginspinner.component.html',
  styleUrls: ['./loginspinner.component.css']
})
export class LoginspinnerComponent implements OnInit {

	constructor(
		private spinner: NgxSpinnerService,
    	private _router: Router,

	){ }

	ngOnInit() {
		this.spinner.show();
		$("header").css("display", "none");
		$("footer").css("display", "none");
		setTimeout
		(
			() =>
			{
				this.spinner.hide();
				var actualRoute = window.location.origin;
        		window.location.replace(actualRoute+'/perfil/'+localStorage.getItem('resID'));
			},
			3000
		);	
	}

}
