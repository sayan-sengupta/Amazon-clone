import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from './productmodal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // data!:product[]//!is used for any data type
  data:any|product[]=[];
  
  // popularproducts_arr:any|product[];
  constructor(private api:ApiService,private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.displayproducts();
    // this.popularproducts();
    
  }
  prevslide(){}
  nextslide(){}
  // popularproducts() {
  //   this.api.popularproduct().subscribe(data=>{
      
  //     this.popularproducts_arr=data;
  //     // console.warn(this.popularproducts_arr);

  //   })
  // }
  displayproducts(){
    this.api.getproduct().subscribe((res:any)=>{
      this.data=res;
       //console.log(res)       
      //  console.log(this.data)

    })
  }

  addtocart(item:product){
    this.api.addtocart(item);

  }

  removeitem(item:product){
    this.api.removeitems(item);

  }
  fetchcategory(items:any){
    console.log(items);
    this.api.setData(items);
    this.route.navigate(['/category']);
  }

  buynow(item:product){
    
      // Implement your checkout logic here
      this.api.createOrder(item).subscribe((response: any) => {
        if (response.status == 200) {
          const paymentOrderId = response.data.id;
          this.api.setSelectedProductForCheckout(item)
          this.route.navigateByUrl(`/checkout/${paymentOrderId}`);
        } else {
          alert('server side error cant process order');
        }
      });
    

  }
}
