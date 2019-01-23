
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  public user: User;

  constructor
  (
  	private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _authguard: AuthGuard
  )
  {
    this.getUser(localStorage.getItem('resID'));
  }

  getUser(id)
  {
    this._userService.getUser(id).subscribe
    (
      response =>
      {
        this.user = response.user;
      },
      error =>
      {
        console.log(<any>error);
      }
    );
  }


 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    console.log(this.user);
    if(this.user)
    {
        if(this.user.tipo=="admin" || this.user.tipo=="member")
        {
          console.log("entro true en canactivate")
          return true
        }
      
    }
    else
    {
      this._router.navigate(['/restringido'])
      console.log("entro false en canactivate")
      return false
    }
  }

}
