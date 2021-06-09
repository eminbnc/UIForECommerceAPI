import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';

import { GetProductsResponseModel } from 'src/app/models/productModel/getProductsResponseModel';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productsArray: GetProductsResponseModel[];
  filterText:string;
  filterMin:number;
  filterMax:number;
  cart:Cart;
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,private cartService:CartService) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["subCategoryId"]){
        this.getProductsBySubCategory(params["subCategoryId"]);
      }else if(params["categoryId"]){
        this.getProductsOfCategory(params["categoryId"])
      }else if(params["id"]){
        this.getProductsByBrand(params["id"]);
      }else if(params["min"] && params["max"]){
        this.getByUnitprice(params["min"],params["max"])
      } else{
        this.getProducts();
      }
    })
   
  }
  getProducts() {
     this.productService.getAllProducts().subscribe((response)=>{
       this.productsArray=response.data;
       this.toastrService.success(response.message);
     },(errorResponse)=>{
      this.toastrService.error(errorResponse.message)
    })
  }
  getProductsByBrand(brandId:number){
    this.productService.getProductsByBrandId(brandId).subscribe((response)=>{
      this.productsArray=response.data;
    })
  }
  getProductsBySubCategory(subCategoryId:number) {
    this.productService.getProductsBySubCategoryId(subCategoryId).subscribe((response)=>{
      this.productsArray=response.data;
    })
 }
 getProductsOfCategory(categoryId:number){
   this.productService.getProductsByCategoryId(categoryId).subscribe((response)=>{
     this.productsArray=response.data;
   })
 }
 getByUnitprice(min:number,max:number){
   this.productService.getProductsByUnitPrice(min,max).subscribe((response)=>{
     this.productsArray=response.data
   })
 }
 addToCart(productId:number){
   let cart =new Cart();
  cart.quantity=1;
   cart.productId=productId;
   cart.userId= JSON.parse(localStorage.getItem('userId')!)
   this.cartService.addToCart(cart).subscribe((response)=>{
     this.toastrService.success("Sepet İşlem: ",response.message)
   })
 }
 
}
