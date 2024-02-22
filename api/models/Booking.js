import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfGuests: Number,
    price: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;