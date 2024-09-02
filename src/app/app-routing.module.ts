import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './PAGES/home/home.component';
import { LoginComponent } from './PAGES/login/login.component';
import { CheckoutComponent } from './PAGES/checkout/checkout.component';
import { SellerAuthComponent } from './PAGES/seller-auth/seller-auth.component';
import { ProductDetailComponent } from './PAGES/product-detail/product-detail.component';
import { RegisterComponent } from './PAGES/register/register.component';
import { CategoryComponent } from './PAGES/category/category.component';
import { SearchComponent } from './PAGES/search/search.component';
import { PaymentSuccessComponent } from './PAGES/payment-success/payment-success.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'product-detail/:productid',component:ProductDetailComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'seller-auth', component: SellerAuthComponent},
  {path:'register', component: RegisterComponent},
  {path:'category', component: CategoryComponent},
  {path:'search/:query', component: SearchComponent},
  { path: 'pay-suc', component: PaymentSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
