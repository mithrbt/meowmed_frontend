import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Vertrag} from "../vertrag";
import {VertragService} from "../vertrag.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css',
  ]
})
export class CustomerDetailsComponent implements OnInit{

  id!: number;
  customer: Customer = new Customer();
  vertrag: Vertrag = new Vertrag();
  vertraege: Vertrag[] = [];

  constructor(private router: Router, private activerouter: ActivatedRoute, private customerService: CustomerService, private vertragService: VertragService) {
  }

  ngOnInit(): void {
    this.id = this.activerouter.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    this.getVertragList();
  }

  private getVertragList(){
    this.vertragService.getVertragList(this.id).subscribe(data =>{
      this.vertraege = data;
    })
  }

  deleteVertrag(event: any, id: number){
    if(confirm('Sind Sie sicher, dass Sie den Vertrag löschen möchten?')){
      event.target.innerText = "Löschen...";

      this.vertragService.deleteVertrag(id).subscribe((response:any) => {
        this.getVertragList();
        alert("Der Vertrag wurde erfolgreich gelöscht.");
      });
    }
  }

  vertragDetails(id: number){
    this.router.navigate(['vertragdetails', id]);
  }

  updateVertrag(id: number){
    this.router.navigate(['update-vertrag', id]);
  }

}
