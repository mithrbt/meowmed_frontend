import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-customer',
  templateUrl: './read-customer.component.html',
  styleUrls: ['./read-customer.component.css']
})
export class ReadCustomerComponent implements OnInit{

  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void{
    this.getCustomerList();
  }

  private getCustomerList(){
    this.customerService.getCustomerList().subscribe(data =>{
      this.customers = data;
    })
  }

  readCustomer() { /*
  Code einfügen*/

  };
}
