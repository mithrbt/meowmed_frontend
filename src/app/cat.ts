enum kastriert{ja = "ja",nein = "nein"}
enum pers{ausgeglichen = "ausgeglichen",verspielt = "verspielt"}
enum env{darussen = "draussen", drin = "drin"}
export class Cat {
  catId!: number;
  name!: string;
  personality!: pers;
  environment!: env;
}
