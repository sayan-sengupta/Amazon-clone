import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.emptycart();
    window.scrollTo(0,0);
  }
  emptycart(){
    this.api.removeall();
  }

}
