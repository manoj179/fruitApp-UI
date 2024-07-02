import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionMgmtService {

  private userData:User
  private accessToken:string;
  private refreshToken:string;
  constructor() { }

  getUserData():User{
    if(sessionStorage.getItem('userData')!=null){
      return JSON.parse(sessionStorage.getItem('userData'));
    }
    else{
      return this.userData;
    }
  }

  setUserData(data){
    // if(!environment.isProd){
    //   sessionStorage.setItem('userData',JSON.stringify(data));
    // }
    // else{
    //   this.userData =  data;
    // } 
    sessionStorage.setItem('userData',JSON.stringify(data));
  }

  setToken(token){
    // if(!environment.isProd){
    //   sessionStorage.setItem('accessToken',token);
    // }
    // else{
    //   this.accessToken = token;
    // }
    sessionStorage.setItem('accessToken',token);
  }

  get getToken():string{
    if(sessionStorage.getItem('accessToken')!=null){
      return sessionStorage.getItem('accessToken')
    }
    else{
      return this.accessToken;
    }
    
  }

  setRefreshToken(token){
    if(sessionStorage.setItem('refreshToken',token)!=null){
      sessionStorage.setItem('refreshToken',token);
    }
    else{
      this.refreshToken = token;
    }
  }

  get getRefreshToken():string{
    if(sessionStorage.getItem('refreshToken')!=null){
      return sessionStorage.getItem('refreshToken')
    }
    else{
      return this.refreshToken;
    }
    
  }

  clearSession(){
    sessionStorage.clear();
    this.userData = null;
    this.accessToken = null;
  }
}
