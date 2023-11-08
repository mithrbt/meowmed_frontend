//Klasse, die die Antwort der Rest-API enthält
import {Cat} from "./cat";

export class Vertrag {
    id!: number;
    start!: Date;
    end!: Date;
    coverage!: number;
}
