import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit{

  customer : Customer = new Customer();


  constructor(private customerService: CustomerService, private router: Router){
  }

  ngOnInit() {
  }

  saveCustomer(){
    this.customerService.createCustomer(this.customer).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  /** Wenn neuer Kunde angelegt wird, soll auf die Kunden Details Seite weitergelietet werden */
  goToCustomerDetails(){
  }

  createCustomer() {
    console.log(this.customer);
    this.saveCustomer();
  }
}
