import { Component } from '@angular/core';
import {Cat} from "../cat";
import {Customer} from "../customer";
import {Vertrag} from "../vertrag";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {VertragService} from "../vertrag.service";

@Component({
  selector: 'app-details-vertrag',
  templateUrl: './details-vertrag.component.html',
  styleUrls: ['./details-vertrag.component.css']
})
export class DetailsVertragComponent {
  id!: number;
  vertrag: Vertrag = new Vertrag();
  cat: Cat = new Cat();

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private vertragService: VertragService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.vertragService.getVertragById(this.id).subscribe(data =>{
      this.vertrag = data;
    });
    console.log("ID: " + this.id);
    this.getCatList();

  }

  private getCatList() {
      this.vertragService.getCatByContractId(this.id).subscribe(data => {
        this.cat = data;
        console.log(data.name);
      });

  }
}
