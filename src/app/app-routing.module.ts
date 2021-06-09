import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '',pathMatch:'full' ,component: ProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/category/subcategory/:subCategoryId', component: ProductComponent },
  { path: 'products/category/:categoryId', component: ProductComponent },
  {path : 'products/brand/:id', component:ProductComponent},
  {path : 'products/pricerange/:min/:max', component:ProductComponent},
  {path : 'products/add', component:ProductAddComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
