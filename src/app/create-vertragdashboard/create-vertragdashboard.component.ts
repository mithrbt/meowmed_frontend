import {Component, OnInit} from '@angular/core';
import {VertragService} from "../vertrag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vertrag} from "../vertrag";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";
import {Cat} from "../cat";

@Component({
  selector: 'app-create-vertragdashboard',
  templateUrl: './create-vertragdashboard.component.html',
  styleUrls: ['./create-vertragdashboard.component.css']
})
export class CreateVertragdashboardComponent implements OnInit{

  vertrag : Vertrag = new Vertrag();
  id!: number;
  customer: Customer = new Customer();
  cat: Cat = new Cat();

  constructor(private vertragService: VertragService, private router: Router, private route: ActivatedRoute, private customerService: CustomerService){
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("id: " + this.id);
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
  }

  saveVertrag(){
    this.vertragService.createVertrag(this.id, this.vertrag).subscribe(data =>{
        console.log(data);
        this.goToCustomerDetails();
      },
      error => console.log(error));
  }

  createVertrag() {
    console.log(this.vertrag);
    this.saveVertrag();
  }

  goToCustomerDetails(){
    this.router.navigate(['kundendetails', this.customer.id]);
  }

}
