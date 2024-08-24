import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../PAGES/home/productmodal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public cartitemList:any=[];
  public productList=new BehaviorSubject<any>([])
  productCategory: any;
  baseUrl='http://localhost:5000';
  selectedProductForCheckout!: product;

  constructor(private http:HttpClient) { }

  getproduct(){
    return this.http.get<product[]>("https://dummyjson.com/products")
  }

  // popularproduct(){
  //   return this.http.get<product[]>("https://dummyjson.com/products?limit=3")
  // }

  getproductbyid(id:string){
    return this.http.get("https://dummyjson.com/products/"+id)
  }


  addtocart(data:product){
    this.cartitemList.push(data);
    this.productList.next(this.cartitemList);
    console.log(this.cartitemList)
  }

  products(){
    return this.productList.asObservable(); 
  }

  removeitems(data:product){
    this.cartitemList.map((a:product,index:product)=>{
      console.log(index)
      if(data.id===a.id){
        this.cartitemList.splice(index,1);
        console.log(this.cartitemList)
      }
    })
    this.productList.next(this.cartitemList)

  }
  setData(data){
    this.productCategory=data;
    console.log(this.productCategory,"category")
  }
  
  //for total
  caltotal(){
    let total=0;
    this.cartitemList.map((a:any)=>{
      total=total+a.price
    })
    return total;
  }

  createOrder(product: product) {
    const payload = {
      productName: product.title,
      amount: product.price,
    };
    return this.http.post(`${this.baseUrl}/api/createPaymentOrder`, {
      payload,
    });
  }

  getSelectedProductForCheckout(){
    return this.selectedProductForCheckout;
  }

  setSelectedProductForCheckout(item:product){
    this.selectedProductForCheckout=item
  }

}
