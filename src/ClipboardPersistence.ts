import { ClipboardCollection } from "./ClipboardCollection";
import { Clipboard } from "./Clipboard";
import { writeFile, promises, readFileSync, writeFileSync, fstat, existsSync } from 'fs';

export class ClipboardPersistence {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }   

    /*async save(data: ClipboardCollection) {
        const jsonString = data.toJSON();
        console.log(jsonString);
        return promises.writeFile(this.filePath, jsonString);
    }*/

    save(data: ClipboardCollection) {
        const jsonString = data.toJSON();
        return writeFileSync(this.filePath, jsonString);
    }

   /* async read() {
        return promises.readFile(this.filePath).then((data) => {
            const jsonString = data.toString();
            console.log(jsonString);
            const jsonObject = JSON.parse(jsonString);
            return Object.entries(jsonObject);
        });
    }*/

    read() : Map<String, Clipboard> {
        if (existsSync(this.filePath)) {
            const data = readFileSync(this.filePath);
            const jsonString = data.toString();
            const jsonObject = JSON.parse(jsonString);
            const map = new Map<String, Clipboard>();
            for(let value in jsonObject) {
                map.set(value, jsonObject[value]);
            }
            return map;
        } else {
            writeFileSync(this.filePath, "{}");
            return new Map<String, Clipboard>();
        }
    }
}