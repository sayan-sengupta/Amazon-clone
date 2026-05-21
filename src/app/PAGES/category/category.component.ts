import { Component, OnInit } from '@angular/core';
import { product } from '../home/productmodal';
import { ApiService } from 'src/app/shared/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  data: any;
  productdetails;
  product:void;
  getprod:any;
  cart: { [key: string]: number } = {};
  constructor(private api:ApiService,private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
    // this.displayproducts();
    // this.popularproducts();
    this.product = this.api.productCategory;
 
    console.log(this.product, "productdetails")
    this.http.get("https://dummyjson.com/products/category/" + this.product).subscribe((data) => {
      console.log("data", data);
 
      // this.subcategory = data['products'][0].category
      // console.log("subcat", this.subcategory)
      this.productdetails = data['products']
      console.log(this.productdetails, "finall")
    }
    )
    window.scrollTo(0,0);
  }
  prevslide(){}
  nextslide(){}
  // popularproducts() {
  //   this.api.popularproduct().subscribe(data=>{
      
  //     this.popularproducts_arr=data;
  //     // console.warn(this.popularproducts_arr);

  //   })
  // }
  // displayproducts(){
  //   this.api.getproduct().subscribe((res:any)=>{
  //     this.data=res;
  //      //console.log(res)       
  //     //  console.log(this.data)

  //   })
  // }

  // addtocart(item:product){
  //   this.api.addtocart(item);

  // }
  addcart(item:product){
    if (!this.cart[item.id]) {
      this.cart[item.id] = 1;
    }
    console.log(item);
    this.api.addtocart(item);
  }

  removeitem(item:product){
    this.api.removeitems(item);

  }
  

}
