import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{

  id!: number;
  customer: Customer = new Customer();

  constructor(private router: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
  }
}
