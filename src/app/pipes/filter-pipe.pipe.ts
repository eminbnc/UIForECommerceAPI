import { Pipe, PipeTransform } from '@angular/core';
import { GetProductsResponseModel } from '../models/productModel/getProductsResponseModel';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: GetProductsResponseModel[], filterText: string): GetProductsResponseModel[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((product:GetProductsResponseModel)=>
      product.productName.toLocaleLowerCase().indexOf(filterText)!==-1 ):value;
  }

}
