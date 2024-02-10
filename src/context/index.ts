import * as crypto from "crypto";

export type ContextItem = Record<string, { id: string } & any>;

export class Context {
    private items: Record<string, ContextItem> = {};

    add(record: ContextItem) {
        const id = crypto.randomBytes(16).toString("hex");
        this.items[id] = { ...record, id };
        return id;
    }

    update(record: ContextItem) {
        this.items[record.id] = record;
    }

    delete(id: string) {
        delete this.items[id];
    }

    clear() {
        this.items = {};
    }

    get(id: string): ContextItem | undefined {
        if (!this.items[id]) return;
        return this.items[id];
    }

    getByProperty(property: string, value: string): ContextItem[] {
        const entries = Object.values(this.items);
        return entries.filter((item) => item[property] === value) ?? [];
    }

    getAll(): ContextItem[] {
        return Object.values(this.items);
    }
}
