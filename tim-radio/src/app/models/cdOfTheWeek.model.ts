export class CdOfTheWeek {
    url: string;
    title: string;
    description: string;
    constructor(url: string, title: string, descrtiption: string) {
        this.url = url; 
        this.title = title;
        this.description = descrtiption;
    }
}