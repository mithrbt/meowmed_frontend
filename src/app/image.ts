import {SafeUrl} from "@angular/platform-browser";
import {Customer} from "./customer";

export class Image {
    id?: number;
    name?: string;
    imageUrl?: string;
    imageId?: string;
    customer!: Customer;
}
