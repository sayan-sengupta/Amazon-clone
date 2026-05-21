import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupObj:any={
    userName:'',
    email:'',
    password:''
  };
  signupUser:any=[];
  
   

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  onSignUp(){
    
    this.http.post('http://localhost:5000/register', this.signupObj).subscribe({
      next: (response: any) => {
        console.log("username after register", response.userName);
        console.log("email after register", response.email); 
        console.log("haspass after register", response.hashedpassword); 
        alert('Registration successful');
        localStorage.setItem('userName', response.userName); // Store the userName
        // console.log("username after register",response.userName)
        this.signupObj = { userName: '', email: '', password: '' };
      },
      error: (error) => {
        alert('Registration failed: ' + error.error.message);
      }
      
    });
    
    console.log("Registed user is", this.signupObj)

  }

    // this.signupUsers.push(this.signupObj);
    // let storage=sessionStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    // this.signupObj={
    //   userName:'',
    //   email:'',
    //   password:''
    // };

  

}
