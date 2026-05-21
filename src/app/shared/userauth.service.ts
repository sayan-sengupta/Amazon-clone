import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(private http:HttpClient, private router:Router) { }

  // login(data:any)
  // {
  //   console.log(data,"data")
  //   this.http.post("http://localhost:5000/login",data).subscribe((result:any)=>{
  //     console.warn(result);
  //     localStorage.setItem("token",result.token);
  //     localStorage.setItem("userName", result.userName);
  //     this.router.navigate(['/home']);
  //   })
  // }

}
