import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/PAGES/home/productmodal';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cartitems:number=0;
  searchRes:any=[];
  showsuggestions: boolean=false;
  userName: any;
  constructor(private api:ApiService,private route:Router) { }

  ngOnInit(): void {
    // this.api.products().subscribe(res=>{
    //   this.cartitems=res.length;
    // })
    this.api.getCartItems().subscribe(res=>{
      this.cartitems=res.length;
    })
    this.userName = localStorage.getItem('email');
    this.userName= this.userName.substring(0,this.userName.lastIndexOf("@"));
    console.log('User Name:', this.userName);
  }
  searchproduct(query:KeyboardEvent){
    if(query){
      const el=query.target as HTMLInputElement;
      const val=el.value.trim();
      if(val){
      this.api.searchproducts(el.value).subscribe((res)=>{
        console.log(res);//display based on what we typed
        // res.length=5; not working this is for limiting search
        this.searchRes=res["products"];
        console.log("sesrchres",this.searchRes)
        this.showsuggestions=true;
      
      });
    }
    else{
      this.searchRes=[];
      console.log("this.searchRes",this.searchRes)
      this.showsuggestions=false;
    }
    }
     
    
  

  }
  hidesearch(){
    
    setTimeout(()=>this.showsuggestions=false,200);
  }
  submitsearch(value:string){
    // console.log(value)
    this.route.navigate([`search/${value}`])
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  
}
