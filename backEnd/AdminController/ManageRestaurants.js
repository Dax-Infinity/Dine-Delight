const title = require('../Moduls/Moduls')
const hotelData = require('../Moduls/HotelDataModule');
const User = require('../Moduls/User');
const multer = require('multer');
const path = require('path');
const ContactMessage = require('../Moduls/ContactMessage');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

// Initialize multer with storage
const upload = multer({ storage: storage });

// Controller function
const addRestaurantData = async (req, res) => {
    try {
        const { name, cuisine, address, city, rating } = req.body;
        const image = req.file ? `uploads/${req.file.filename}` : null;

        // Create a new restaurant document
        const newRestaurant = new hotelData({
            name,
            cuisine,
            address,
            city,
            rating,
            image,
        });

        // Save to MongoDB
        await newRestaurant.save();
        res.status(201).json({ message: 'Restaurant added successfully' });
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ message: 'Failed to add restaurant' });
    }
};

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


const contactReport = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create a new contact message
        const newMessage = new ContactMessage({
            name,
            email,
            message
        });

        // Save the message to the database
        await newMessage.save();

        res.status(200).json({ success: true, message: 'Message received!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
    }
}

const getAllContacts = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ date: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while fetching messages.' });
    }
}

const approveContact = async (req, res) => {
    try {
        await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ success: true, message: 'Message approved.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
}

const ignoreContact = async (req, res) => {
    try {
        await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'ignored' });
        res.status(200).json({ success: true, message: 'Message ignored.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ContactMessage.findByIdAndDelete(id);
        res.status(201).json(result);
    }
    catch (error) {
        throw error;
    }
}
module.exports = { PutRestaurantData, deleteRestaurantData, getallreservations, getAllUsers, addRestaurantData, contactReport, upload, getAllContacts, approveContact, ignoreContact, deleteContact }