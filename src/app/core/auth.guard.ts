import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class authGuard implements CanActivate {
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(sessionStorage.getItem("isLoggedIn")){
      return true;
    }
    else{
      return false;
    }
  }
}