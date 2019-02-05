import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor
  (
		private spinner: NgxSpinnerService,
		private _authService: AuthService,

  )
  { }

  ngOnInit()
  {
  	this.spinner.show();

	    setTimeout
	    (
	      () =>
	      {
	        this.spinner.hide();
	        this._authService.logoutClear();
          var actualRoute = window.location.origin;
          window.location.replace(actualRoute+'/login/');
	      },
	      3000
	    );

  }

}
