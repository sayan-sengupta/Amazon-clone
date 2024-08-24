import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { UserauthService } from 'src/app/shared/userauth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // loginObj:any={
  //   email:'',
  //   password:''
  // };
  // signupUsers: any[]=[];
  constructor(private userauthservice:UserauthService ,private http:HttpClient) { }
   // ngOnInit(): void {
  //   const localData=localStorage.getItem('signUpUsers');
  //   if(localData!=null){
  //     this.signupUsers=JSON.parse(localData)
  //   }
  // }
  // onLogIn(){
  //   const isUserExist=this.signupUsers.find(m=>m.userName==this.loginObj.email&&m.password==this.loginObj.password);
  //   if(isUserExist!=undefined){
  //     alert('User loggged in success')
  //   }
  //   else{
  //     alert('wrong email or password')
  //   }

  // }
  userLogin(data:any){
    console.log(data);
    this.userauthservice.login(data);
    }

}
