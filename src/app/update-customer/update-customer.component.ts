import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {Customer} from '../model/customer';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from "../enum/Title";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  id!: number;
  customer: Customer = new Customer();
  formattedBirthdate: string = '';
  titleKeys = Object.keys(Title);
  title!: Title | undefined;


  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Get ID from route
    this.customerService.getCustomerById(this.id).subscribe(
      data => {
        this.customer = data;
        console.log(this.customer.birthdate);
        const date = new Date(this.customer.birthdate);
        this.formattedBirthdate = this.formatDate(date);
      },
      error => console.log(error)
    );
  }

  getTitleValue(key: string): string {
    return Title[key as keyof typeof Title]; // Gib den Wert für den übergebenen Schlüssel zurück
  }


  onSubmit() {
    this.customerService.updateCustomer(this.id, this.customer).subscribe(
      data => {
        this.goToCustomerList();

      },
      error => console.log(error)
    );
  }

  goToCustomerList() {
    this.router.navigate(['/kunden']);
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toISOString().substring(0, 10);
  }

  goBack() {
    this.router.navigate(['kunden']);
  }
}
