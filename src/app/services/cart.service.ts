import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private htppClient:HttpClient,@Inject("apiUrl") private apiUrl:any) { }

  addToCart(cart:Cart):Observable<ResponseModel>{
    let newPath=this.apiUrl+'/carts';
    return this.htppClient.post<ResponseModel>(newPath,cart);
  }
}
