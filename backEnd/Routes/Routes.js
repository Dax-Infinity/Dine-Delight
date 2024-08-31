const express = require('express')
const { postData, getData, deleteData, putData } = require('../Controller/ControllerForCard')
const { loginUser, registerUser } = require('../Controller/ControllerForLogin')
const { getReservationData, getEmail } = require('../Controller/ControllerForUser')
const { forgotPassword, resetPassword } = require('../Controller/authController')
const { getallreservations, PutRestaurantData, deleteRestaurantData, getAllUsers, addRestaurantData, upload, contactReport, getAllContacts, ignoreContact, approveContact, deleteContact } = require('../AdminController/ManageRestaurants')
const app = express()


app.post('/register', registerUser)
app.post('/loginUser', loginUser)
app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);
app.post('/reservation', postData)

app.get('/hotelData', getData)
app.get('/reservations', getReservationData)
app.get('/get-email', getEmail)

app.put('/reservations/:id', putData)

app.delete('/reservations/:id', deleteData)


//admin routes
app.post('/contact', contactReport)
app.get('/contact', getAllContacts)
app.get('/allreservations', getallreservations)
app.get('/allusers', getAllUsers)
app.put('/hotelData/:id', PutRestaurantData)
app.put('/contact/ignore/:id', ignoreContact)
app.put('/contact/approve/:id', approveContact)
app.delete('/contact/:id', deleteContact)
app.delete('/hotelData/:id', deleteRestaurantData)
app.post('/addnewdata', upload.single('image'), addRestaurantData);
module.exports = app;