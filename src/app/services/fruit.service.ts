import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../models/responseObject';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor(private http:HttpClient) { }

  async getFruitById(id){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Fruite/${id}`).toPromise();
  }

  async getFruitList(){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Fruite`).toPromise();
  }

  async addFruit(data){
    return await this.http.post<ResponseObject>(`${environment.apiUrl}/Fruite`,data).toPromise();
  }

  async updateFruit(data){
    return await this.http.put<ResponseObject>(`${environment.apiUrl}/Fruite`,data).toPromise();
  }
}
