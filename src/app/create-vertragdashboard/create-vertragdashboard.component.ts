import {Component, OnInit} from '@angular/core';
import {VertragService} from "../vertrag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vertrag} from "../vertrag";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";

@Component({
  selector: 'app-create-vertragdashboard',
  templateUrl: './create-vertragdashboard.component.html',
  styleUrls: ['./create-vertragdashboard.component.css']
})
export class CreateVertragdashboardComponent implements OnInit{

  vertrag : Vertrag = new Vertrag();
  id!: number;
  customer: Customer = new Customer();


  constructor(private router: Router, private activerouter: ActivatedRoute, private customerService: CustomerService, private vertragService: VertragService) {
  }

  ngOnInit() {
    this.id = this.activerouter.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
  }

  saveVertrag(){
    this.vertragService.createVertrag(this.customer.id, this.vertrag).subscribe(data =>{
        console.log(data);
      },
      error => console.log(error));
  }

  createVertrag() {
    console.log(this.vertrag);
    this.saveVertrag();
  }

}
