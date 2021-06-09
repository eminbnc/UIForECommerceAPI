import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SubCategory } from '../models/subCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:any) { }

  
  getSubCategoriesByCategoryId(categoryId:number):Observable<ListResponseModel<SubCategory>>{
    let newPath=this.apiUrl+"SubCategories/category/"+categoryId;
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }
  getSubCategories():Observable<ListResponseModel<SubCategory>>{
    let newPath=this.apiUrl+"SubCategories";
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }

}
