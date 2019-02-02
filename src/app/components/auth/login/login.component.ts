import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService,UserService]
})
export class LoginComponent implements OnInit {
  public user : User;
  public email:string;
  public password:string;
  public type:string = "password";
  public show:boolean = false;
  public resID:string=localStorage.getItem('resID');
  public url:string;
  public isError:boolean = false;
  public messageError:string;
  constructor
  (
    private _router: Router,
    private authService: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private _location: Location
    )
  {


  }

  ngOnInit()
  {
  }

  login(form: NgForm)
  {
    if(form.valid)
    {
      this.authService.login(this.email,this.password).subscribe
      (
        res =>
        {   
          this.resID = res.user[0]._id;
          this.isError = false;
          this.loginRedirect(res);
        },
        error =>
        {
          if(error instanceof HttpErrorResponse)
          {
            if(error.status===404)
            {
              this.messageError = error.error.message;
              console.log(error);
              this.onIsError();
            }
          }else
          {
            this.messageError = error.message;
            console.log(error);
            this.onIsError();
          }
        }
      );
    }else
    {
      this.onIsError();
    }
  }
  onIsError(){
    this.isError=true;
  }
  closeAlertError(){
    this.isError=false;
  }

  loginRedirect(res)
  {
    this.spinner.show();

    setTimeout
    (
      () =>
      {
        this.spinner.hide();
        localStorage.setItem('token',res.token);
        localStorage.setItem('resID', res.user[0]._id);
        var actualRoute = window.location.origin;
        window.location.replace(actualRoute+'/perfil/'+this.resID);
      },
      3000
      );
  }

  toggleShow()
  {
    this.show = !this.show;
    if (this.show){
      this.type = "text";
    }
    else {
      this.type = "password";
    }
  }

  goBack() { 
   this._location.back(); 
  }
}
