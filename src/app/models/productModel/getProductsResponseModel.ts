export interface GetProductsResponseModel{
    id: number;
    subCategoryId: number;
    userId:number;
    productName:string;
    brandId: number;
    model: string;
    imagePath: string;
    technicality:string;
    description: string;
    unitPrice: number;
    tax: number;
    discount: number;
    stock: number;
}