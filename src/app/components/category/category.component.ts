import { Component, OnInit} from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/subCategory';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { GetCategoriesWithSubCategoriesModel } from 'src/app/models/categoriesWithSubCategoriesModel';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  allCategories:GetCategoriesWithSubCategoriesModel[];
  subCategories:SubCategory[];
  categories:Category[];
  dataLoaded=false;
  minPrice:number=0;
  maxPrice:number=1000;
  subCategoryIdControl:number=0;
  brands:Brand[]
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice=value;
          return '<b>Min Fiyat:</b> (tl) ' + value;
        case LabelType.High:
          this.maxPrice=value;
          return '<b>Max Fiyat:</b> (tl) ' + value;
        default:
          return '$' + value;
      }
    }
  };
  constructor(private categoryService:CategoryService,private subCategoryService:SubCategoryService,
    private brandService:BrandService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    
   this.getCategories();
    this.getBrands();
    
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data;
      this.toastrService.success(response.message);
      this.dataLoaded=true;
      console.log(response.data);
    },(errorResponse)=>{
      this.toastrService.error(errorResponse.message)
    })
  }
 getAllCategories(){
   this.categoryService.getCategoriesWithSubCategories().subscribe((response)=>{
     this.allCategories=response.data;
     this.toastrService.success(response.message);
     this.dataLoaded=true;
   })
 }
 getSubCategories(){
  this.subCategoryService.getSubCategories().subscribe((response)=>{
    this.subCategories=response.data;
    this.dataLoaded=true;
  })
}
getBrands(){
  this.brandService.getBrands().subscribe((response=>{
    this.brands=response.data;
    this.toastrService.success(response.message);
  }))
}
getSubCategoriesByCategory(categoryId:number){
  this.subCategoryService.getSubCategoriesByCategoryId(categoryId).subscribe((response)=>{
    this.subCategories=response.data;
    this.dataLoaded=true;
  })
}


setCurrentSubCategory(subCateoryId:number){
this.subCategoryIdControl=subCateoryId;
}

getCurrentSubCategoryClass(allCategoryId:number){
  if(allCategoryId==this.subCategoryIdControl){
    return "background-color: lightblue; text-align: center;"
  }else{
    return "";
  }
}

setAllCategoryClick(){
  this.subCategoryIdControl=0;
}
getAllCategoryClass(){
  if(!this.subCategoryIdControl){
    return "background-color: lightblue; text-align: center;";
  }else{
    return "";
  }
}
}