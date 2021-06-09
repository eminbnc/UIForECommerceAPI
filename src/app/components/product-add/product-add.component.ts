import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator,AbstractControl,FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/subCategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductAddService } from 'src/app/services/product-add.service';
import * as DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import { ImagePath } from 'src/app/models/imagePath';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productImage:ImagePath;
  fileData:File;
  productAddedForm:FormGroup;
  categories:Category[];
  subCategories:SubCategory[];
  subCategoryLoaded:boolean=false;
  subCategoryId:number;
  editor:any;
  constructor(private productAddService:ProductAddService,private formBuilder: FormBuilder,
    private toastrService:ToastrService,private categoryService:CategoryService) { }
  
  ngOnInit(): void {
  this.editor=DecoupledDocument;
  this.createProductAddedForm();
  this.getCategories();
  }
  
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
    }
  upload(files:any){
  this.fileData=files.target.files[0];
  let formData=new FormData();

  formData.append("imageFile",this.fileData);
  this.productAddService.saveProductImage(formData).subscribe((result)=>{
    console.log(result.data);
    this.productImage=result.data;
   this.productAddedForm.controls.imagePath.setValue(result.data);
  })
  }

  createProductAddedForm(){
    this.productAddedForm=this.formBuilder.group({
      subCategoryId:[],
      userId:[],
      productName:["",[Validators.required,Validators.minLength(3)]],
      brand:["",[Validators.required,Validators.minLength(3)]],
      model:["",[Validators.required,Validators.minLength(3)]],
      technicality:["",Validators.required],
      description:["",[Validators.required,Validators.min(10)]],
      unitPrice:[,[Validators.required,Validators.min(1)]],
      discount:[""],
      tax:[18,[Validators.required,Validators.min(0)]],
      stock:[,[Validators.required,Validators.min(1)]],
      imagePath:[""]
    });
  }
 onSubmit(){
   if (this.productAddedForm.valid) {
     this.productAddService.addProduct(this.productAddedForm.value).subscribe((response)=>{
    this.toastrService.success(response.message);
     },(errorResponse)=>{
       this.toastrService.error(errorResponse.message)
     })
   }
 }
 getCategories(){
  this.categoryService.getCategories().subscribe((response)=>{
    this.categories=response.data;
  })
 }
 getSubCategories(categoryId:number){
   this.categoryService.getSubCategoriesByCategory(categoryId).subscribe((response)=>{
     this.subCategories=response.data;
     this.subCategoryLoaded=true;
     console.log(this.subCategories)
   },(errorResponse)=>{
     this.toastrService.error(errorResponse.message)
   })
 }
  
createProduct(){
  if(this.productAddedForm.valid && this.subCategoryId!=null &&this.productImage!=null){
    this.productAddedForm.controls.subCategoryId.setValue(this.subCategoryId);
    this.productAddedForm.controls.userId.setValue(JSON.parse(localStorage.getItem('userId')!));
    console.log(this.productAddedForm.value);
    let createdProductModel=Object.assign({},this.productAddedForm.value);
    this.productAddService.addProduct(createdProductModel).subscribe(response=>{
      this.toastrService.success(response.message);
    })
    
}
else{
  this.toastrService.error("Lütfen zorunlu alanları doldurunuz!");
}
}

 displayCategoryName(category:Category){
   return category.categoryName;
   this.getSubCategories(category.id);
 }
 displaySubCategoryName(subCategory:SubCategory){
  return subCategory.subCategoryName;
 }
 setSubCategoryId(subCategoryId:number){
   this.subCategoryId=subCategoryId;
 }
}
