import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:any) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath='https://localhost:44353/api/Brands';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  
}
