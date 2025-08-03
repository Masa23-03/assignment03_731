"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Course = exports.User = void 0;
/*
 Implement Model-Specific Repositories Create one class per model that extends the base repository , Each class:
                Should pass static data to the base class
                May include additional methods (optional)
 */
const BaseRepository_1 = require("./BaseRepository");
class User extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
    }
    async DeactivateUser(id) {
        const user = await this.FetchOneItemByID(id);
        if (user) {
            user.isActive = false;
        }
    }
}
exports.User = User;
class Course extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
    }
}
exports.Course = Course;
class Booking extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
    }
    async applyCoupon(id, couponValue) {
        const booking = await this.FetchOneItemByID(id);
        if (booking) {
            booking.price = booking.price - couponValue;
        }
    }
}
exports.Booking = Booking;
