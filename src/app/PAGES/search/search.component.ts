import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../home/productmodal';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult:any|product[];
  constructor(private api:ApiService,private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let query=this.route.snapshot.paramMap.get('query');//query because in routing module we specified :query after search so whatever guver there must also be used here
    //query && because if the query is null, if nothing is passed in the search value then this line will not run
    query && this.api.searchproducts(query).subscribe((res)=>{
      this.searchresult=res
    })
  }

}
