import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
    id!: number;
    customer: Customer = new Customer();
    formattedBirthdate: string = '';

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

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
}
