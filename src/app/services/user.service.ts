import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../models/responseObject';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  async loginUser(userName,passsword){
    return this.http.get<ResponseObject>(`${environment.apiUrl}/User/login/${userName}/${passsword}`).toPromise();
  }

  async register(userData){
    return this.http.post<ResponseObject>(`${environment.apiUrl}/User`,userData).toPromise();
  }

  async getuserList(){
    return this.http.get<ResponseObject>(`${environment.apiUrl}/User`).toPromise();
  }

  async updateUserStatus(id,status){
    return this.http.get<ResponseObject>(`${environment.apiUrl}/User/UpdateUserStatus/${id}/${status}`).toPromise();
  }
  
}
