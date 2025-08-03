/*
 Implement Model-Specific Repositories Create one class per model that extends the base repository , Each class:
                Should pass static data to the base class
                May include additional methods (optional)
 */
import { BaseRepository } from "./BaseRepository";


export type UserModel = {
  id: number;
  email: string;
  name: string;
  isActive?: boolean | null | undefined;
  age: number;
};
export type CourseModel = {
  id: number;
  title: string;
  status: "in-progress" | "completed" | "not-started";
};
export type BookingModel = {
  id: number;
  date: string;
  userId: number;
  courseId: number;
  price: number;
};
export class User extends BaseRepository<UserModel> {
  constructor() {
    super();
  }
  async DeactivateUser(id: UserModel["id"]) {
    const user = await this.FetchOneItemByID(id);
    if (user) {
      user.isActive = false;
    }
  }
}

export class Course extends BaseRepository<CourseModel> {
  constructor() {
    super();
  }
}

export class Booking extends BaseRepository<BookingModel> {
  constructor() {
    super();
  }

  async applyCoupon(id: BookingModel["id"], couponValue: number) {
    const booking = await this.FetchOneItemByID(id);
    if (booking) {
      booking.price = booking.price - couponValue;
    }
  }
}
