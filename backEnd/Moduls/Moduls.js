const { default: mongoose } = require("mongoose");
const userSchema = mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    persons: {
        type: Number,
        required: true
    }
})
const User = mongoose.model('Hotel_Seat_Reservations', userSchema);
module.exports = User
