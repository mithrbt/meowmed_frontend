import {Component, OnInit} from '@angular/core';
import {Cat} from "../model/cat";
import {Vertrag} from "../model/vertrag";
import {ActivatedRoute, Router} from "@angular/router";
import {VertragService} from "../service/vertrag.service";
import {ImageService} from "../service/image.service";

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

  loadData() {
    this.vertragService.getVertragById(this.id).subscribe(data => {
      this.vertrag = data;

      this.getCatList();
    });
  }

  private getCatList() {
    this.vertragService.getCatByContractId(this.id).subscribe(data => {
      this.cat = data;

      //Bild anzeigen
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
    this.router.navigate(['kundendetails', this.vertrag.customer.id]);
  }

  //Anzeige
  getEnvironmentText(p: string): string {
    switch (p) {
      case 'DRAUSSEN':
        return 'Draußen';
      case 'DRIN':
        return 'Drin';
      default:
        return '';
    }
  }

  getColorText(p: string): string {
    switch (p) {
      case 'SCHWARZ':
        return 'Schwarz';
      case 'WEISS':
        return 'Weiß';
      case 'BRAUN':
        return 'Braun';
      case 'MEHRFAHRBIG':
        return 'Mehrfarbig';
      case 'ORANGE':
        return 'Orange';
      case 'GRAU':
        return 'Grau';
      default:
        return '';
    }
  }

  getPersonalityText(p: string): string {
    switch (p) {
      case 'VERSPIELT':
        return 'Verspielt';
      case 'AUSGEGLICHEN':
        return 'Ausgeglichen';
      case 'SCHEU':
        return 'Scheu';
      case 'ZUTRAULICH':
        return 'Zutraulich';
      case 'ANHAENGLICH':
        return 'Anhänglich';
      case 'VERSCHMUST':
        return 'Verschmust';
      default:
        return '';
    }
  }
}
