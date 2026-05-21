import { Component,NgZone, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../home/productmodal';
import { ActivatedRoute, Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  showproduct:product[]=[];
  totalamount:number=0;
  selectProduct: product;
  razorPayKey: any;

  constructor(private api:ApiService,private router:Router,private route:ActivatedRoute,private ngzone:NgZone) { }

  ngOnInit(): void {
    
    this.api.getCartItems().subscribe(res => {
      this.showproduct = res;
      this.calculateTotalAmount(); 
    });
    window.scrollTo(0,0);
  }
  calculateTotalAmount() {
    this.totalamount=parseFloat(
      this.showproduct
        .reduce((total, item) => total + ((item.price-(item.price*(item.discountPercentage/100))) * (item.quantity || 0)), 0)
        .toFixed(2)
    );
    // this.totalamount=Math.round(this.totalamount);
    
  }
  emptycart(){
    console.log("empty-check")
    this.api.removeall();
    
  }
  
  increase(item: product) {
    item.quantity = (item.quantity || 0) + 1;
    this.api.updateCartItem(item);//sending the item to service
    this.calculateTotalAmount();
  }

  decrease(item: product) {
    if (item.quantity > 1) {
      item.quantity = (item.quantity || 0) - 1;
      this.api.updateCartItem(item);
  } else {
      this.deleteitem(item); // removing item if quantity is 0
  }
  this.calculateTotalAmount();
  }

  // Remove an item from the cart
  deleteitem(item: product) {
    this.api.removeitems(item);
    this.showproduct = this.showproduct.filter(p => p.id !== item.id);
    this.calculateTotalAmount();
  }
  deleteitemcart(item:product){
    this.api.removeitems(item);
  }
  

  buynow() {
    // console.log(this.totalamount);
    const amount=(Math.round(Number(this.totalamount*100*83)))

    const RozarpayOptions = {
      description: 'Amazon payment gateway',
      currency: 'INR',
      amount: amount,
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

    

    Razorpay.open(RozarpayOptions)
  }
  

}
