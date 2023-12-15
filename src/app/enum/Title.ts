export enum Title{
  DR = 'DR',
  PROF = 'PROF'
}

export function getEnumValues<T>(enumObj: any): T[] {
  return Object.keys(enumObj)
    .map(key => enumObj[key as keyof typeof enumObj]) as T[];
}

// Verwendung:
const titles: string[] = getEnumValues<string>(Title);
console.log(titles); // ["Dr.", "Prof."]
