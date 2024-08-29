const express = require('express');
const cors = require('cors');
const path = require('path');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 4000;
const user = require('./Routes/Routes');
require('dotenv').config();
app.use(express.json());
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontEnd/build")));
    res.sendFile(path.resolve(__dirname, "frontEnd/build/index.html"));
})


mongoose.connect('mongodb://127.0.0.1:27017/Hotel_Info').then(() => {
    console.log('MongoDB successfully connected ..!');
});

app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT} 🔥🔥`);
});
