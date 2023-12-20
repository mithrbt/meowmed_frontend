import {Customer} from "./customer";
import {Cat} from "./cat";

export class Image {
    id?: number;
    name?: string;
    imageUrl?: string;
    imageId?: string;
    customer!: Customer;
    cat!: Cat;
}
