import {Component, OnInit} from '@angular/core';
import {VertragService} from "../vertrag.service";
import {Router} from "@angular/router";
import {Vertrag} from "../vertrag";

@Component({
  selector: 'app-create-vertragdashboard',
  templateUrl: './create-vertragdashboard.component.html',
  styleUrls: ['./create-vertragdashboard.component.css']
})
export class CreateVertragdashboardComponent implements OnInit{

  vertrag : Vertrag = new Vertrag();

  constructor(private vertragService: VertragService, private router: Router){
  }

  ngOnInit() {
  }

  saveVertrag(){
    this.vertragService.createVertrag(this.vertrag).subscribe(data =>{
        console.log(data);
      },
      error => console.log(error));
  }

  createVertrag() {
    console.log(this.vertrag);
    this.saveVertrag();
  }

}
