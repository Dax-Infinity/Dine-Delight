const title = require('../Moduls/Moduls')
const hotelData = require('../Moduls/HotelDataModule');
const User = require('../Moduls/User');
const PutRestaurantData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const hotel = await hotelData.findByIdAndUpdate(id, updatedData, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteRestaurantData = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await hotelData.findByIdAndDelete(id);
        res.status(201).json(result);
    }
    catch (error) {
        throw error;
    }

}
const getallreservations = async (req, res) => {
    try {
        const restaurants = await title.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude the password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}
module.exports = { PutRestaurantData, deleteRestaurantData, getallreservations, getAllUsers }