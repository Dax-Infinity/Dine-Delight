const title = require('../Moduls/Moduls')
const hotelData = require('../Moduls/HotelDataModule');
const User = require('../Moduls/User');
const postData = async (req, res) => {
    try {
        const userInfo = new title(req.body);
        const data = await userInfo.save();
        res.status(201).json({ data })
    }
    catch (error) {
        throw error;
    }
}
const getData = async (req, res) => {
    try {
        const { location, cuisine, rating, searchBar } = req.query;
        const filter = {};

        if (location && location !== 'All') filter.city = location;
        if (cuisine && cuisine !== 'All') filter.cuisine = cuisine;
        if (rating) filter.rating = { $gte: parseFloat(rating) };
        if (searchBar) {
            const searchRegex = new RegExp(searchBar, 'i');
            filter.$or = [
                { name: searchRegex },
                { cuisine: searchRegex },
                { city: searchRegex },
                { address: searchRegex }
            ];
        }
        const data = await hotelData.find(filter).sort({ rating: -1 });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
};


const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await title.findByIdAndDelete(id);
        res.status(201).json(result);
    }
    catch (error) {
        throw error;
    }

}
const putData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHotel = await title.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel data not found" });
        }

        res.status(200).json({ message: "Data updated successfully", updatedHotel });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the data", error: error.message });
    }
};







module.exports = { postData, getData, deleteData, putData }