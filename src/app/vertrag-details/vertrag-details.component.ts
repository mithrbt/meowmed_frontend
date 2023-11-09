import {Component, OnInit} from '@angular/core';
import {Cat} from "../cat";
import {Vertrag} from "../vertrag";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {VertragService} from "../vertrag.service";

@Component({
  selector: 'app-vertrag-details',
  templateUrl: './vertrag-details.component.html',
  styleUrls: ['./vertrag-details.component.css']
})
export class VertragDetailsComponent implements OnInit{
  id!: number;
  vertrag: Vertrag = new Vertrag();
  cat: Cat = new Cat();

  constructor(private route: ActivatedRoute,
              private vertragService: VertragService,) {
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
      console.log("ID: " + data);
      this.cat = data;
      console.log(data.name);
    });

  }

}
