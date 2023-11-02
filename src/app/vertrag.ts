//Klasse, die die Antwort der Rest-API enthält

enum kastriert{ja = "ja",nein = "nein"}
enum pers{ausgeglichen = "ausgeglichen",verspielt = "verspielt"}
export class Vertrag {
    id!: number;
    name!: string;
    rasse!: string;
    farbe!: string;
    alter!: number;
    kastriert!: kastriert;
    persoenlichkeit!: pers;
    gewicht!: number;
    beginn!: Date;
    ende!: Date;
    deckungssummer!: number;
    beitrag!: number;
}
