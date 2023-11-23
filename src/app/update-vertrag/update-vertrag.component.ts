
import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {VertragService} from "../vertrag.service";
import {Vertrag} from "../vertrag";
import {CatService} from "../cat.service";
import {Cat} from "../cat";
@Component({
  selector: 'app-update-vertrag',
  templateUrl: './update-vertrag.component.html',
  styleUrls: ['./update-vertrag.component.css']
})
export class UpdateVertragComponent implements OnInit {

  id!: number;
  vertrag: Vertrag = new Vertrag();
  cat: Cat = new Cat();
  result!: number;

  constructor(private catService: CatService,
              private vertragService: VertragService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; //Get ID from route
    this.vertragService.getVertragById(this.id).subscribe(data => {
      this.vertrag = data;
      console.log("Ausgewählter Vertrag: ", this.vertrag);
      this.vertragService.getCatByContractId(this.vertrag.id).subscribe(data => {
        this.cat = data;
        console.log("Ausgewählte Katze: ", this.cat);
      });
    }, error => console.log(error));
  }


  onSubmit() {
    this.vertragService.updateVertrag(this.id, this.vertrag).subscribe(data => {
      this.updateCat();
    }, error => console.log(error));
    this.gotoVertragList(this.id);
  }

  gotoVertragList(id: number) {
    this.router.navigate(['/vertragdetails', this.id]);

  }

  /*quote() {
    this.vertragService.quote(this.cat, this.vertrag).subscribe(data => {
        this.result = data;
        console.log(this.result);
      },
      error => {
        console.log(error);
      });
  }*/

  private updateCat() {
    this.catService.updateCat(this.cat.id, this.cat).subscribe(data => {
    }, error => console.log(error));
  }

}
