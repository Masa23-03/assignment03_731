export interface ModelBase{
    id:number;
}


/*
Create a Generic Repository Interface , The interface must define the following methods, 
all returning Promises:
                 Fetch all items
                 Fetch one item by ID
                 Create a new item
                 Update an existing item
                 Delete an item by ID
                 Find items by filter (using partial fields)
 */
export interface BaseRepositoryInterface<T extends ModelBase>{
FetchAllItems():Promise<T[]>;
FetchOneItemByID(id:T['id']):Promise<T | null>;
CreateANewItem(payLoad:T):Promise<T['id']>;
UpdateAnExistingItem(id:T['id'] , payLoad:Partial<T>):Promise<boolean>;
DeleteAnItemByID(id:T['id']):Promise<T['id'] | null>;
FindItemsByFilter(payLoad:Partial<T>):Promise<T[]>;


}