import { BaseRepositoryInterface, ModelBase } from "./RepositoryInterface";
/*
 Implement a Generic Base Repository Class , This class must:
                Accept any model type that includes an id field 
                Store data in-memory (array)
                Implement all interface methods in a generic, reusable way
 */
export class BaseRepository<T extends ModelBase>
  implements BaseRepositoryInterface<T>
{
  private _items: T[] = [];

  async FetchAllItems(): Promise<T[]> {
    return this._items;
  }
  async FetchOneItemByID(id: T["id"]): Promise<T | null> {
    const foundedItem = this._items.find((item) => item.id === id);
    return foundedItem ? foundedItem : null;
  }
  async CreateANewItem(payLoad: T): Promise<T["id"]> {
    this._items.push(payLoad);
    return payLoad.id;
  }
  async UpdateAnExistingItem(
    id: T["id"],
    payLoad: Partial<T>
  ): Promise<boolean> {
    const index = this._items.findIndex((item) => item.id === id);
    if (index === -1) {
      console.warn("item was not found!");
      return false;
    }
    this._items[index] = { ...this._items[index], ...payLoad };
    return true;
  }
  async DeleteAnItemByID(id: T["id"]): Promise<T["id"] | null> {
    const index = this._items.findIndex((item) => item.id === id);
    if (index === -1) {
      console.warn(`item with id ${id} doesn't exist!`);
      return null;
    }
    this._items.splice(index, 1);
    return id;
  }
  async FindItemsByFilter(payLoad: Partial<T>): Promise<T[]> {
    return this._items.filter((item) => {
      for (const key of Object.keys(payLoad)) {
        const field = key as keyof T;
        if (payLoad[field] !== item[field]) {
          return false;
        }
      }
      return true;
    });
  }
}
