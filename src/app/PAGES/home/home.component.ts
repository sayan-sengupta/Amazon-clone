import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from './productmodal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  // data!:product[]//!is used for any data type
  data:any|product[]=[];
  cart: { [key: string]: number } = {};
  tokenexist:any;
  // popularproducts_arr:any|product[];
  constructor(private api:ApiService,private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.displayproducts();
    this.initializeCarousel();
    window.scrollTo(0,0);
    this.tokenexist=localStorage.getItem('token');
  }
  
  prevslide(){}
  nextslide(){}
  
  displayproducts(){
    this.api.getproduct().subscribe((res:any)=>{
      this.data=res;
      
       //console.log(res)       
      //  console.log(this.data)

    })
  }
  // calculateDiscount(item:product):number{
  //   return item.price-(item.price*(item.discountPercentage/100));
  // }

  addcart(item:product){
    if (!this.cart[item.id]) {
      this.cart[item.id] = 1;
    }
    console.log(item);
    this.api.addtocart(item);
  }
  // increase(item:product){
  //   if (this.cart[item.id]) {
  //     this.cart[item.id] += 1; // Increase quantity of the product
  //   } else {
  //     this.cart[item.id] = 1; // adding to cart if not present
  //   }
  //   console.log(this.cart);
  //   console.log(item)
  //   this.api.addtocart(item);

  // }
  // decrease(item:product){
  //   if (this.cart[item.id] && this.cart[item.id] > 1) {
  //     this.cart[item.id] -= 1; // Decrease quantity
  //   } else {
  //     delete this.cart[item.id]; // Remove item if quantity is 0
  //   }
  //   console.log(this.cart);
    
  // }

  removeitem(item:product){
    this.api.removeitems(item);

  }
  fetchcategory(items:any){
    console.log(items);
    this.api.setData(items);
    this.route.navigate(['/category']);
  }
  initializeCarousel() {
    const items: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel .carousel-item');
    
    items.forEach((el: HTMLElement) => {
      const minPerSlide: number = 4;
      let next: HTMLElement | null = el.nextElementSibling as HTMLElement;

      for (let i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0] as HTMLElement;
        }
        const cloneChild: HTMLElement = next.cloneNode(true) as HTMLElement;
        el.appendChild(cloneChild.children[0] as HTMLElement);
        next = next.nextElementSibling as HTMLElement;
      }
    });
  }

  
  
}
