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
    // this.getRazorPayKey();
    // this.listenSelectedProduct();
    // this.getOrderId();
    // this.api.products().subscribe(res=>{
    //   this.showproduct=res;
    //   this.totalamount=this.api.caltotal();
    // })
    this.api.getCartItems().subscribe(res => {
      this.showproduct = res;
      this.calculateTotalAmount(); // Calculate the total amount
    });
  }
  calculateTotalAmount() {
    this.totalamount=parseFloat(
      this.showproduct
        .reduce((total, item) => total + (item.price * (item.quantity || 0)), 0)
        .toFixed(2)
    );
    
  }
  emptycart(){
    console.log("empty-check")
    this.api.removeall();
    
  }
  // Increase the quantity of an item in the cart
  increase(item: product) {
    item.quantity = (item.quantity || 0) + 1; // Safeguard against undefined quantity
    this.api.updateCartItem(item);
    this.calculateTotalAmount();
  }

  // Decrease the quantity of an item in the cart
  decrease(item: product) {
    if (item.quantity > 1) {
      item.quantity = (item.quantity || 0) - 1; // Safeguard against undefined quantity
      this.api.updateCartItem(item);
  } else {
      this.deleteitem(item); // Remove item if quantity is 0
  }
  this.calculateTotalAmount();
  }

  // Remove an item from the cart
  deleteitem(item: product) {
    this.api.removeitems(item);
    this.showproduct = this.showproduct.filter(p => p.id !== item.id);
    this.calculateTotalAmount();
  }
  // getRazorPayKey() {
  //   this.api.getRazorPayKey().subscribe((response: any) => {
  //     this.razorPayKey = response['key_id'];
  //   });
  //}
  // listenSelectedProduct() {
  //   this.selectProduct=this.api.getSelectedProductForCheckout();
  // }

  // deleteitem(item:product){
  //   this.api.removeitems(item)
  // }

  buynow() {
    // console.log(this.totalamount);
    const amount=(Math.round(Number(this.totalamount*100*84)))

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

    // const successCallback = (paymentid: any) => {
    //   console.log('Payment ID:', paymentid);
    //   this.router.navigate(['/payment-success']);
    // }

    // const failureCallback = (e: any) => {
    //   console.log('Payment Error:', e);
    // }

    Razorpay.open(RozarpayOptions)
  }
  // getOrderId(){
  //   return this.route.snapshot.params['paymentOrderId'];
  // }
  // getRazorPayKey() {
  //   this.api.getRazorPayKey().subscribe((response: any) => {
  //     this.razorPayKey = response['key_id'];
  //   });
  // }
  // payWithRazorpay() {
  //   const paymentOrderId = this.getOrderId();
  //   console.log(this.razorPayKey);
  //   const options: any = {
  //     key: this.razorPayKey,
  //     amount: this.selectProduct?.price * 100, // amount should be in paise format to display Rs 1255 without decimal point
  //     currency: 'INR',
  //     name: 'Brogrammers Shop', // company name or product name
  //     description: '', // product description
  //     image: './../../assets/images/logo.png', // company logo or product image
  //     order_id: paymentOrderId, // order_id created by you in backend
  //     modal: {
  //       // We should prevent closing of the form when esc key is pressed.
  //       escape: false,
  //     },
  //     notes: {
  //       // include notes if any
  //     },
  //     theme: {
  //       color: '#ddcbff',
  //     },
  //   };
  //   options.handler = (response: any, error: any) => {
  //     options.response = response;
  //     if (error) {
  //       this.router.navigateByUrl('/paymentfailed');
  //     } else {
  //       this.api
  //         .verifyPaymentSignature(response, paymentOrderId)
  //         .subscribe((response: any) => {
  //           response.data.isPaymentVerfied
  //             ? this.router.navigateByUrl('paymentsuccess')
  //             : this.router.navigateByUrl('paymentfailed');
  //         });
  //     }
  //     // call your backend api to verify payment signature & capture transaction
  //   };
  //   options.modal.ondismiss = () => {
  //     // handle the case when user closes the form while transaction is in progress
  //     alert('Transaction has been cancelled.');
  //     this.router.navigateByUrl('');
  //   };
  //   const rzp = new this.api.nativeWindow.Razorpay(options);
  //   rzp.open();
  // }

}
