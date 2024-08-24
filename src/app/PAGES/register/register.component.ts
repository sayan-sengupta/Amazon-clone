import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupUsers:any[]=[];
  signupObj:any={
    userName:'',
    email:'',
    password:''
  };
  
   

  constructor() { }

  ngOnInit(): void {
  }
  onSignUp(){

    this.signupUsers.push(this.signupObj);
    let storage=sessionStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj={
      userName:'',
      email:'',
      password:''
    };

  }

}
