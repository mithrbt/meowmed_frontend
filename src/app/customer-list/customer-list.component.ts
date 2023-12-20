import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../model/customer'
import {CustomerService} from '../service/customer.service';
import {Router} from "@angular/router";
import {VertragService} from "../service/vertrag.service";
import {CatService} from "../service/cat.service";
import {Vertrag} from "../model/vertrag";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  customer: Customer = new Customer();
  contract: Vertrag[] = [];
  contractIDs: number[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';

  constructor(private customerService: CustomerService,
              private router: Router,
              private contractService: VertragService,
              private catService: CatService) {
  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  private getCustomerList() {
    this.customerService.getCustomerList().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = this.customers;
    });
  }

  deleteCustomer(event: any, id: number) {
    if (confirm('Sind Sie sicher, dass Sie den Kunden löschen möchten?')) {
      event.target.innerText = "Löschen...";
      this.catService.deleteByCustomerID(id).subscribe((response: any) => {
        this.contractService.deleteByCustomerId(id).subscribe((response: any) => {
          this.customerService.deleteCustomer(id).subscribe((response: any) => {
            this.getCustomerList();
            alert("Der Kunde wurde erfolgreich gelöscht.");
          });
        });
      });
    }
  }

  customerDetails(id: number) {
    this.router.navigate(['kundendetails', id]);
  }

  updateCustomer(id: number) {
    this.router.navigate(['update-kunde', id]);
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      (customer.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (customer.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
