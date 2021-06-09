import { ResponseModel } from "./responseModel";

export interface ResponseWithDataModel<T> extends ResponseModel{
    data:T;
}