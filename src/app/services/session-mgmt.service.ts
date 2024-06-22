import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionMgmtService {

  private userData:User
  private accessToken:string;
  constructor() { }

  getUserData():User{
    if(!environment.isProd){
      return JSON.parse(sessionStorage.getItem('userData'));
    }
    else{
      return this.userData;
    }
  }

  setUserData(data){
    if(!environment.isProd){
      sessionStorage.setItem('userData',JSON.stringify(data));
    }
    else{
      this.userData =  data;
    } 
  }

  setToken(token){
    if(!environment.isProd){
      sessionStorage.setItem('accessToken',token);
    }
    else{
      this.accessToken = token;
    }
    
  }

  getToken():string{
    return this.accessToken;
  }

  clearSession(){
    sessionStorage.clear();
    this.userData = null;
    this.accessToken = null;
  }
}
