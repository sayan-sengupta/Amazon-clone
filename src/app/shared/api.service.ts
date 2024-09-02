import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../PAGES/home/productmodal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public cartitemList:any=[];
  public productList=new BehaviorSubject<any>([])
  productCategory: any;
  baseUrl='http://localhost:5000';
  selectedProductForCheckout!: product;

  private cartItems = new BehaviorSubject<product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http:HttpClient) { }

  getproduct(){
    return this.http.get<product[]>("https://dummyjson.com/products?limit=50")
  }

  // popularproduct(){
  //   return this.http.get<product[]>("https://dummyjson.com/products?limit=3")
  // }

  getproductbyid(id:string){
    return this.http.get("https://dummyjson.com/products/"+id)
  }

  searchproducts(query:string){
    return this.http.get(`https://dummyjson.com/products/search?q=${query}`);

  }


  addtocart(data:product){
    let currentCart = this.cartItems.getValue();
    const existingProductIndex = currentCart.findIndex(item => item.id === data.id);

    if (existingProductIndex !== -1) {
        // Product already in cart, update the quantity
        currentCart[existingProductIndex].quantity += data.quantity || 1; // Use 1 if data.quantity is undefined
    } else {
        // New product, add to cart with initial quantity
        const newProduct = {
            ...data,
            quantity: data.quantity || 1 // Default quantity to 1 if not defined
        };
        currentCart.push(newProduct);
    }

    this.cartItems.next(currentCart);
    console.log('Updated cart:', currentCart);
    // const existingProduct = this.cartitemList.find(({ id }) => id === data.id
    //   // p => p.id === product.id
    // );
 
    // if (existingProduct) {
    //   existingProduct.quantity += 1;
    //   existingProduct.total = existingProduct.quantity * existingProduct.price;
 
    //   // this.cartItemList.push(existingProduct);
 
 
    // } else {
    //   const newProduct = {
    //     ...data,
    //     quantity: 1,
    //     total: data.price
    //   };
    //   this.cartitemList.push(newProduct);
    // }
    // console.log("productlist",this.productList);
    // this.productList.next(this.cartitemList);
    // console.log("cartitemlist", this.cartitemList);
    
    // this.cartitemList.push(data);
    // this.productList.next(this.cartitemList);
    // console.log(this.cartitemList)
  }

  products(){
    return this.productList.asObservable(); 
  }

  removeitems(data:product){
    let currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(i => i.id === data.id);
    if (index !== -1) {
      currentCart.splice(index, 1);
      this.cartItems.next(currentCart);
    }
    console.log('Removed from cart:', data);
    // this.cartitemList.map((a:product,index:product)=>{
    //   console.log(index)
    //   if(data.id===a.id){
    //     this.cartitemList.splice(index,1);
    //     console.log(this.cartitemList)
    //   }
    // })
    // this.productList.next(this.cartitemList)

  }
  getCartItems(): Observable<product[]> {
    return this.cartItems$;
  }
  updateCartItem(updatedProduct: product) {
    let currentCart = this.cartItems.getValue();
    const index = currentCart.findIndex(item => item.id === updatedProduct.id);
    if (index !== -1) {
      currentCart[index].quantity = updatedProduct.quantity;
      this.cartItems.next(currentCart);
    }
  }
  //
  setData(data){
    this.productCategory=data;
    console.log(this.productCategory,"category")
  }
  
  //for total
  caltotal():number{
    return this.cartItems.getValue()
        .reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);
    // let total=0;
    // this.cartitemList.map((a:any)=>{
    //   total=total+a.price
    // })
    // return total;
  }
  removeall(){
    console.log("cartitemlist-1",this.cartItems)
    this.cartItems.next([]);
    console.log("cartitemlist-2",this.cartItems)    
  }
  //
  // createOrder(product: product) {
  //   const payload = {
  //     productName: product.title,
  //     amount: product.price,
  //   };
  //   return this.http.post(`${this.baseUrl}/api/createPaymentOrder`, {
  //     payload,
  //   });
  // }
  // //
  // getSelectedProductForCheckout(){
  //   return this.selectedProductForCheckout;
  // }
  // //
  // setSelectedProductForCheckout(item:product){
  //   this.selectedProductForCheckout=item
  // }

}
