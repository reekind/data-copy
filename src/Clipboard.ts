export class Clipboard {
    private id: string;
    private _text: string;

    constructor(id: string) {
        this.id = id;
        this.text = "";
    }

    set text(text: string) {
        this._text = text;
    }
    get text() {
        return this._text;
    }
}