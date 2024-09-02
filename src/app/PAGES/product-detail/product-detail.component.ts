 import { Component, OnInit,NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../home/productmodal';


declare var Razorpay: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productdata:any|product;
  showadd:boolean=true;
  showremove:boolean=false;
  price:any;

  
  constructor(private api:ApiService, private activatedroute:ActivatedRoute, private ngzone:NgZone,private router:Router) { }

  ngOnInit(): void {
    console.log(this.activatedroute)
    let productid =this.activatedroute.snapshot.paramMap.get('productid');
    console.log(productid);
    productid && this.api.getproductbyid(productid).subscribe((res)=>{
      this.productdata=res;
      this.price=(this.productdata.price-(this.productdata.price*(this.productdata.discountPercentage/100)))*83;
      console.log(res);
      console.log(this.productdata)
      console.log(this.activatedroute);
      console.log("Price",this.price);
    })
    window.scrollTo(0,0);
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

  buynow() {
    // console.log(this.totalamount);
    

    const RozarpayOptions = {
      description: 'Amazon payment gateway',
      currency: 'INR',
      amount: this.price*100,
      name: 'Amazon',
      key: 'rzp_test_IdogP5ErHQ5ig4',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      prefill: {
        name: 'sayan sengupta',
        email: 'sayansengupta2001@gmail.com',
        phone: '8017895767'
      },
      handler:(response:any)=>{
        this.ngzone.run(()=>{
          this.router.navigate(['/pay-suc'])
        });
      },
      theme: {
        color: '#ffd814'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    // const successCallback = (paymentid: any) => {
    //   console.log('Payment ID:', paymentid);
    //   this.router.navigate(['/payment-success']);
    // }

    // const failureCallback = (e: any) => {
    //   console.log('Payment Error:', e);
    // }

    Razorpay.open(RozarpayOptions)
  }

}
