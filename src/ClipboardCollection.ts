import { Clipboard } from "./Clipboard";
import { ClipboardPersistence } from "./ClipboardPersistence";

export class ClipboardCollection {
    private clipboards : Map<String, Clipboard>;
    private persistence : ClipboardPersistence;
    constructor(persistence: ClipboardPersistence, clipboards: Map<String, Clipboard>) {
        this.clipboards = clipboards;
        this.persistence = persistence
    }

    static init(filePath = 'storage.json') {
        const persistence = new ClipboardPersistence(filePath);
        const clipboards = persistence.read();
        return new ClipboardCollection(persistence, clipboards);
    }

    count() {
        return this.clipboards.size;
    }
    /**
     * Get clipboard via id
     * @param {string} id 
     */
    get(id: string) {
        if (this.clipboards.has(id)) {
            return this.clipboards.get(id);
        } else {
            return null;
        }
    }
    
    new() {
        const rand = Math.random().toString(16).substr(2, 8);
        const newClipboard = new Clipboard(rand);
        this.clipboards.set(rand, newClipboard);
        return newClipboard;
    }

    update(id: string, text: string) {
        const clipboard = this.get(id);
        if (clipboard) {
            clipboard.text = text;
            this.clipboards.set(id, clipboard);
            this.persistence.save(this);
        } else {
            throw new Error("Clipboard to be updated does not exist");
        }
    }

    toJSON() {
        return JSON.stringify(Object.fromEntries(this.clipboards));
    }
}