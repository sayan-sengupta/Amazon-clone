import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA}  from '@angular/core';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './COMPONENTS/header/header.component';
import { FooterComponent } from './COMPONENTS/footer/footer.component';
import { HomeComponent } from './PAGES/home/home.component';
import { CheckoutComponent } from './PAGES/checkout/checkout.component';
import { LoginComponent } from './PAGES/login/login.component';
import { BannerComponent } from './COMPONENTS/banner/banner.component';
import { SellerAuthComponent } from './PAGES/seller-auth/seller-auth.component';
import { ProductDetailComponent } from './PAGES/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterComponent } from './PAGES/register/register.component';
import { ProfileComponent } from './PAGES/profile/profile.component';
import { CategoryComponent } from './PAGES/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CheckoutComponent,
    LoginComponent,
    BannerComponent,
    SellerAuthComponent,
    ProductDetailComponent,
    RegisterComponent,
    ProfileComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

})
export class AppModule { }
