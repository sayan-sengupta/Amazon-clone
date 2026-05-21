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

    if (existingProductIndex !== -1) {// if Product already in cart quantity will increase
        currentCart[existingProductIndex].quantity += data.quantity || 1; 
    } else {
        const newProduct = {//else if new product, add to cart with initial quantity
            ...data,
            quantity: data.quantity || 1 
        };
        currentCart.push(newProduct);
    }

    this.cartItems.next(currentCart);
    console.log('Updated cart:', currentCart);
    
  }

  products(){
    return this.productList.asObservable(); 
  }
  

  removeitems(data:product){//for removing the product as whole
    let currentCart = this.cartItems.getValue();//first its getting the value whats in the cartitems
    const index = currentCart.findIndex(i => i.id === data.id);//its getting the index as the id of which product is being added
    if (index !== -1) {//checking if the product exists and not = -1 because the products id starts from id 0
      currentCart.splice(index, 1);//its saying at postion index remove 1 item 
      this.cartItems.next(currentCart);//current cart item in currentcart 
    }
    console.log('Removed from cart:', data);
  }

  getCartItems(): Observable<product[]> {//this will be called to display the produst in the cart
    return this.cartItems$;//return items the cart
  }

  updateCartItem(updatedProduct: product) {
    let currentCart = this.cartItems.getValue();//initialising the current cart to get whats already inthe cart
    const index = currentCart.findIndex(item => item.id === updatedProduct.id);//getting the id of the products
    if (index !== -1) {
      currentCart[index].quantity = updatedProduct.quantity;//updates the quantity
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
  }
//The .reduce() method will work as follows:
//when we use .reduce it take the initial value as 0 so its passing 0as total and then the item
// Initial value: 0
// First iteration: total = 0 + (10 * 2) = 20
// Second iteration: total = 20 + (20 * 1) = 40
// Third iteration: total = 40 + (5 * 4) = 60
// So, the final result returned by .reduce() is 60, which is the total cost of all items in the cart.
  

removeall(){//this is called when we need delete all the items from cart 
    console.log("cartitemlist-1",this.cartItems)
    this.cartItems.next([]); //emtying the cartitem array
    console.log("cartitemlist-2",this.cartItems)    
  }
}
