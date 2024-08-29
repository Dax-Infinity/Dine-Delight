const title = require('../Moduls/Moduls');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');

const getReservationData = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, "dax");
        const reservations = await title.find({ email: decoded.email });
        res.json(reservations);
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token or authentication error' });
    }
};

const getEmail = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ email: decoded.email });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const deleteOutdatedReservations = async () => {
    try {
        const now = new Date();
        // console.log('Current date and time:', now);
        const reservations = await title.find({ date: { $lt: now } });

        if (reservations.length > 0) {
            await title.deleteMany({ date: { $lt: now } });
        }
        else {
            console.log('No outdated reservations found');
        }
    } catch (error) {
        console.error('Error deleting outdated reservations:', error);
    }
};


// shedual at mid nigth
cron.schedule('0 0 * * *', () => {
    deleteOutdatedReservations();
    console.log('Running the deletion of outdated reservations');
});


module.exports = { getReservationData, getEmail };
