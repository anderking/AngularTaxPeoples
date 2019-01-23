import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

	public user:User;
	public email:string;
	public password:string;
  	public tipo:string="null";
	public resID:string;
	public isError:boolean = false;
	public isAlert:boolean = false;
	public message:string;

	constructor
	(
		private _router: Router,
		private authService: AuthService,
		private _userService: UserService,
    	private spinner: NgxSpinnerService,

	)
	{		

	}

	ngOnInit()
	{
		console.log("dasds")
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.authService.register(this.email,this.password,this.tipo).subscribe
			(
				res =>
				{
					this.resID = res.user._id;
					localStorage.setItem('token',res.token);
					localStorage.setItem('resID', this.resID);
					console.log(this.isAlert,this.isError);
					this.loginRedirect()
				},
				err =>
				{
					this.isAlert=false;
					console.log(err);
					this.onIsError();

					if(err instanceof HttpErrorResponse)
					{
						if(err.status===404)
						{
							this.message = err.error.message;
						}
					}
				}
			);
		}else
		{
			this.onIsError();
		}
	}

	onIsError()
	{
		this.isError=true;
		window.scrollTo(0, 0);

	}

	closeAlertError()
	{
		this.isError=false;
	}

	loginRedirect()
	{
		this.spinner.show();

	    setTimeout
	    (
	      () =>
	      {
	        this.spinner.hide();
	        window.location.replace('http://localhost:4200/register/'+this.resID);
	      },
	      3000
	    );
	}
}
