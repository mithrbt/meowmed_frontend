import {Component, OnInit} from '@angular/core';
import {Cat} from "../model/cat";
import {Vertrag} from "../model/vertrag";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../service/customer.service";
import {VertragService} from "../service/vertrag.service";
import {ImageService} from "../service/image.service";
import {Customer} from "../model/customer";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-vertrag-details',
  templateUrl: './vertrag-details.component.html',
  styleUrls: ['./vertrag-details.component.css']
})
export class VertragDetailsComponent implements OnInit {
  id!: number;
  vertrag: Vertrag = new Vertrag();
  cat: Cat = new Cat();

  dbImage!: any;
  postResponse!: any;
  image!: any;
  imageUrl: any;
  uploadedImage!: File;
  successResponse!: any;

  constructor(private route: ActivatedRoute,
              private vertragService: VertragService,
              private router: Router,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadData();

  }

  loadData(){
    this.vertragService.getVertragById(this.id).subscribe(data => {
      this.vertrag = data;
      this.getCatList();
    });
  }

  private getCatList() {
    this.vertragService.getCatByContractId(this.id).subscribe(data => {
      this.cat = data;

      //Bild anzeigen
      console.log("Cat ID: " + this.cat.id);
      this.imageService.viewCatImage(this.cat.id).subscribe(res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      });
    });

  }

  //Foto hochladen
  public onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedImage = input.files[0];
    }
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    console.log("KundenID: ", this.cat.id);
    this.imageService.uploadCatImage(this.cat.id, imageFormData).subscribe((response) => {
      window.location.reload();
    });
  }

  //Foto löschen
  deleteImage(event: any, id: number) {
    if (confirm('Sind Sie sicher, dass Sie das Bild löschen möchten?')) {
      event.target.innerText = "Löschen...";
      this.imageService.deleteCatImage(id).subscribe((response: any) => {
        alert("Das Foto wurde gelöscht.");
        window.location.reload();
      });
    }
  }
  goBack() {
    this.router.navigate(['kundendetails',this.vertrag.customer.id]);
  }

}
