import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionMgmtService {

  private userData:User
  private accessToken:string;
  constructor() { }

  getUserData():User{
    return this.userData;
  }

  setUserData(data){
    this.userData =  data;
  }

  setToken(token){
    this.accessToken = token;
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
