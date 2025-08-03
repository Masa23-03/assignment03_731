"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
/*
 Implement a Generic Base Repository Class , This class must:
                Accept any model type that includes an id field
                Store data in-memory (array)
                Implement all interface methods in a generic, reusable way
 */
class BaseRepository {
    _items = [];
    async FetchAllItems() {
        return this._items;
    }
    async FetchOneItemByID(id) {
        const foundedItem = this._items.find((item) => item.id === id);
        return foundedItem ? foundedItem : null;
    }
    async CreateANewItem(payLoad) {
        this._items.push(payLoad);
        return payLoad.id;
    }
    async UpdateAnExistingItem(id, payLoad) {
        const index = this._items.findIndex((item) => item.id === id);
        if (index === -1) {
            console.warn("item was not found!");
            return false;
        }
        this._items[index] = { ...this._items[index], ...payLoad };
        return true;
    }
    async DeleteAnItemByID(id) {
        const index = this._items.findIndex((item) => item.id === id);
        if (index === -1) {
            console.warn(`item with id ${id} doesn't exist!`);
            return null;
        }
        this._items.splice(index, 1);
        return id;
    }
    async FindItemsByFilter(payLoad) {
        return this._items.filter((item) => {
            for (const key of Object.keys(payLoad)) {
                const field = key;
                if (payLoad[field] !== item[field]) {
                    return false;
                }
            }
            return true;
        });
    }
}
exports.BaseRepository = BaseRepository;
