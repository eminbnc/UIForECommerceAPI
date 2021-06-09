export interface Product{
    id: number;
    subCategoryId: number;
    storeId:number;
    productName:string;
    brandId: number;
    model: string;
    technicality:string;
    description: string;
    unitPrice: number;
    tax: number;
    discount: number;
    stock: number;
    imagePath: string;
}