
export class Greetings {
    name: string;
    text: string;
    date: any;
    active: boolean;
    constructor(name: string, text: string, date?: any, active?: boolean) {
        this.name = name;
        this.text = text;
        this.date = date;
        this.active = active;
    }
}