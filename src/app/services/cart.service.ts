import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from '../models/responseObject';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  async getCartById(id){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Cart/GetCartById/${id}`).toPromise();
  }
 
  async getCartByUserId(id){
    return await this.http.get<ResponseObject>(`${environment.apiUrl}/Cart/GetCartByUserId/${id}`).toPromise();
  }

  async addItemToCart(data){
    return await this.http.post<ResponseObject>(`${environment.apiUrl}/Cart`,data).toPromise();
  }

  async updateFruit(data){
    return await this.http.put<ResponseObject>(`${environment.apiUrl}/Fruite`,data).toPromise();
  }

  async removeCartItem(id){
    return await this.http.delete<ResponseObject>(`${environment.apiUrl}/Cart/${id}`).toPromise();
  }
}
