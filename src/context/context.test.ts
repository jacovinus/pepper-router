import { Context } from "./";
// tests for context feature

describe("context", () => {
    it("should add and get item", () => {
        const context1 = new Context();
        const item = { name: "test", surname: "test2" };
        const newItemId = context1.add(item);
        const retrievedItem = context1.get(newItemId);
        expect(retrievedItem).toStrictEqual({ ...item, id: newItemId });
    });

    it("should update item", () => {
        const context2 = new Context();
        const item = { name: "test" };
        const itemId = context2.add(item);
        context2.update({ ...item, name: "updated", id: itemId });
        expect(context2.get(itemId)?.name).toEqual("updated");
    });

    it("should delete item", () => {
        const context3 = new Context();
        const item = { name: "test" };
        const itemId = context3.add(item);
        context3.delete(itemId);
        expect(context3.get(itemId)).toBeUndefined();
    });

    it("should clear context", () => {
        const context4 = new Context();
        const item = { name: "test" };
        const addItem = context4.add(item);
        context4.clear();
        expect(context4.get(addItem)).toBeUndefined();
    });

    it("should get all items", () => {
        const context5 = new Context();
        const item = { name: "test" };
        const newItemId = context5.add(item);
        expect(context5.getAll()).toEqual([{ ...item, id: newItemId }]);
    });

    it("should get items by property", () => {
        const context6 = new Context();
        const item = { name: "test" };
        const newId = context6.add(item);
        expect(context6.getByProperty("name", "test")).toEqual([
            { ...item, id: newId },
        ]);
    });
});
