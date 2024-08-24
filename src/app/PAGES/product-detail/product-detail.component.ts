 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../home/productmodal';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productdata:any|product;
  showadd:boolean=true;
  showremove:boolean=false;

  
  constructor(private api:ApiService, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedroute)
    let productid =this.activatedroute.snapshot.paramMap.get('productid');
    console.log(productid);
    productid && this.api.getproductbyid(productid).subscribe((res)=>{
      this.productdata=res;
      console.log(res);
      console.log(this.productdata)
    })
  }

  addtocart(productdata:product){
    this.showadd=false;
    this.showremove=true;
    this.api.addtocart(productdata)


  }
  removeitem(productdata:product){
    this.showremove=false;
    this.showadd=true;
    this.api.removeitems(productdata)

  }

}
