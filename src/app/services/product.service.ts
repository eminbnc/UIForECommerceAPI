import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import {GetProductsResponseModel} from '../models/productModel/getProductsResponseModel'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:any) { }

  getAllProducts():Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+"Products";
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
  getProductById(id:number):Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+'Products/'+id;
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
  getProductsByUnitPrice(minPrice:number,maxPrice:number):Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+"Products/getbyunitprice/"+minPrice+"/"+maxPrice;
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
  getProductsByBrandId(brandId:number):Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+'Products/brands/'+brandId;
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
  getProductsByCategoryId(categoryId:number):Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+'Products/category/'+categoryId;
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
  getProductsBySubCategoryId(subCategoryId):Observable<ListResponseModel<GetProductsResponseModel>>{
    let newPath=this.apiUrl+'Products/subcategories/'+subCategoryId;
    return this.httpClient.get<ListResponseModel<GetProductsResponseModel>>(newPath);
  }
}
