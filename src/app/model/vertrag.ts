import {Customer} from "./customer";

export class Vertrag {
    id!: number;
    start!: Date;
    end!: Date;
    coverage!: number;
    quote!: number;
    customer!: Customer;
}
