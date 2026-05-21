import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginObj:any={
    email:'',
    password:''
  };
  isloggedin = false;
  constructor(private http:HttpClient,private router:Router) { }  
  ngOnInit(): void {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.isloggedin = true;
    //   this.router.navigate(['/home']); // Redirect to home if already logged in
    // }
  }
  userLogin(){

    
    if(this.loginObj.email && this.loginObj.password){
    this.http.post<any>('http://localhost:5000/login', this.loginObj).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);  // Store the token
        console.log("token",response.token)//rpinting the token in console
        localStorage.setItem('email', response.email);  // Store the token
        console.log("email",response.email)
        this.isloggedin=true;
        this.router.navigate(['/home']);  // Navigate to the home page on login
      },
      error: (err) => {
        if(err){
        alert('Invalid Credentials');
        this.isloggedin=false;
      }

    }
    }); 
  }
  else{
    alert('Please fill both the fields')
  }

}
}
