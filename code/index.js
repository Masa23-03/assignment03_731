"use strict";
/*
Seed Static Data Each repository instance must be initialized with at least 2–3 sample records ,
Use this data to simulate real-world behavior in your tests.
Test the Full Flow In a separate script:
                Create each repository instance
                Test and log the output of each method defined in the interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
const DataModels_1 = require("./DataModels");
const userRepo = new DataModels_1.User();
const courseRepo = new DataModels_1.Course();
const bookingRepo = new DataModels_1.Booking();
async function test() {
    const user01Id = await userRepo.CreateANewItem({
        id: 12345,
        name: 'kelly',
        email: 'kelly@gmail.com',
        age: 32,
        isActive: true,
    });
    const user02Id = await userRepo.CreateANewItem({
        id: 12346,
        name: 'jim',
        email: 'jim@gmail.com',
        isActive: true,
        age: 27,
    });
    const user03Id = await userRepo.CreateANewItem({
        id: 12347,
        name: 'aya',
        email: 'aya@gmail.com',
        isActive: true,
        age: 32,
    });
    const course01Id = await courseRepo.CreateANewItem({
        id: 1111,
        title: 'Learn TypeScript',
        status: 'in-progress'
    });
    const course02Id = await courseRepo.CreateANewItem({
        id: 1112,
        title: 'Learn React',
        status: 'not-started'
    });
    const course03Id = await courseRepo.CreateANewItem({
        id: 1113,
        title: 'Learn SQL',
        status: 'completed'
    });
    const bookingId12 = await bookingRepo.CreateANewItem({
        id: 123,
        date: new Date().toISOString(),
        price: 130,
        userId: user02Id,
        courseId: course01Id,
    });
    //FindItemsByFilter 
    const searchForUser = await userRepo.FindItemsByFilter({ age: 32 });
    console.log("users who's age is 32:", searchForUser);
    //Deactivate user:
    userRepo.DeactivateUser(user02Id);
    //fetch all users 
    console.log('users: ', await userRepo.FetchAllItems());
    //Delete user
    const deletedUserId = await userRepo.DeleteAnItemByID(user02Id);
    console.log('deleted user id: ', deletedUserId);
    //fetch all users 
    console.log('users after deleting : ', deletedUserId, ' are: ', await userRepo.FetchAllItems());
    const bookingId13 = await bookingRepo.CreateANewItem({
        id: 124,
        date: new Date().toISOString(),
        price: 150,
        userId: user03Id,
        courseId: course01Id,
    });
    const bookingDate = await bookingRepo.FetchOneItemByID(124);
    console.log('booking with id: 124 is', bookingDate);
    await courseRepo.UpdateAnExistingItem(1111, { title: 'Learn JavaScript' });
    //fetch all courses 
    console.log('courses:', await courseRepo.FetchAllItems());
    //fetch all bookings 
    console.log('bookings: ', await bookingRepo.FetchAllItems());
    //apply coupon
    await bookingRepo.applyCoupon(124, 50);
    console.log('After applying coupon for booking 124-> bookings: ', await bookingRepo.FetchAllItems());
}
test();
