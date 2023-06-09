import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../models/responseObject';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http:HttpClient) { }

  async getOrderById(id){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Purchase/GetOrderId/${id}`).toPromise();
  }
 
  async getOrderByUserId(id){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Purchase/GetOrderByUserId/${id}`).toPromise();
  }

  async addItemToCart(cartId){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Purchase/addPurchase/${cartId}`).toPromise();
  }

  async updatePurchaseStatus(data){
    return await this.http.put<ResponseObject>(`${environment.apiUrl}/Purchase`,data).toPromise();
  }
}
