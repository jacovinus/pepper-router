import * as crypto from "crypto";

export type ContextItem = Record<string, { id: string } & any>;

type Context = {
    add: (record: ContextItem) => void;
    update: (record: ContextItem) => void;
    delete: (id: string) => void;
    clear: () => void;
    get: (id: string) => ContextItem;
    getByProperty: (property: string, value: string) => ContextItem;
    getAll: () => ContextItem[];
    items: Record<string, ContextItem>;
};

const context: Context = {
    items: {},

    add(record: ContextItem) {
        const id = crypto.randomBytes(16).toString("hex");
        this.items[id] = { ...record, id };
    },

    update(record: ContextItem) {
        this.items[record.id] = record;
    },

    delete(id: string) {
        delete this.items[id];
    },

    clear() {
        this.items = {};
    },

    get(id: string) {
        return this.items[id];
    },

    getByProperty(property: string, value: string) {
        const entries = Object.values(this.items);
        return entries.filter((item) => item[property] === value) ?? [];
    },

    getAll() {
        return Object.values(this.items);
    },
};

export default context;
