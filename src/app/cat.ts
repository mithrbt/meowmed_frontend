enum kastriert{ja = "ja",nein = "nein"}
enum pers{ausgeglichen = "ausgeglichen",verspielt = "verspielt"}
enum env{draussen = "draussen", drin = "drin"}
export class Cat {
  id!: number;
  name!: string;
  personality!: pers;
  environment!: env;
}
