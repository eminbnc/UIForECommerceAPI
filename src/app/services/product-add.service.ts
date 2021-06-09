import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagePath } from '../models/imagePath';
import { ProductAddModel } from '../models/productModel/productAddModel';
import { ResponseModel } from '../models/responseModel';
import { ResponseWithDataModel } from '../models/responseWithDataModel';

@Injectable({
  providedIn: 'root'
})
export class ProductAddService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:any) { }


  saveProductImage(imageFile:any):Observable<ResponseWithDataModel<ImagePath>>{
    let newPath=this.apiUrl+"Images" ;
    return this.httpClient.post<any>(newPath,imageFile);
   }
  addProduct(productAddModel:ProductAddModel):Observable<ResponseModel>{
    let newPath=this.apiUrl+"Products";
    return this.httpClient.post<ResponseModel>(newPath,productAddModel);
  }

}
