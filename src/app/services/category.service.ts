import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCategoriesWithSubCategoriesModel } from '../models/categoriesWithSubCategoriesModel';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { SubCategory } from '../models/subCategory';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient,@Inject("apiUrl") private apiUrl:any) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath="https://localhost:44353/api/Categories";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  getCategoriesWithSubCategories():Observable<ListResponseModel<GetCategoriesWithSubCategoriesModel>>{
    let newPath=this.apiUrl+"https://localhost:44353/api/categories/withsubcategories";
    return this.httpClient.get<ListResponseModel<GetCategoriesWithSubCategoriesModel>>(newPath);
  }
  getSubCategoriesByCategory(categoryId:number):Observable<ListResponseModel<SubCategory>> {
    let newPath=this.apiUrl+ "subcategories/category"+categoryId
    return this.httpClient.get<ListResponseModel<SubCategory>>(newPath);
  }

}
