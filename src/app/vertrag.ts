//Klasse, die die Antwort der Rest-API enthält

enum kastriert{ja = "ja",nein = "nein"}
enum pers{ausgeglichen = "ausgeglichen",verspielt = "verspielt"}
export class Vertrag {
    id!: number;
    start!: Date;
    end!: Date;
    coverage!: number;
}
