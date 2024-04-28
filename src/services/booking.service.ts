import Booking from "../models/Booking";
import { IUser } from "../utils/types";

export const cancel = async (
  bookingId: string,
  currentUser: IUser
): Promise<boolean> => {
  try {
    const bookingIndex = currentUser.bookings.findIndex(
      (booking: any) => booking === bookingId
    );

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    currentUser.bookings.splice(bookingIndex, 1);

    await currentUser.save();
    await Booking.findByIdAndDelete(bookingId);

    return true;
  } catch (error: any) {
    console.error("Error cancelling booking:", error.message);
    throw new Error(error.message);
  }
};
