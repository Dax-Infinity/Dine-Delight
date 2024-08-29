import './App.css';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import FAQ from './pages/Faq';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NotFound from './pages/NotFound';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import AdminPage from './adminControl/allRestaurants/AllRestaurantPage';
import ReservationsPage from './adminControl/allReservations/AllReservationsPage';
import AddRestaurantPage from './adminControl/addRestaurant/AddRestaurantPage';
import AllUsersPage from './adminControl/allUsers/AllUsersPage';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/admin/all-restaurants" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
          <Route path="/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
          <Route path="/admin/all-users" element={<PrivateRoute><AllUsersPage /></PrivateRoute>} />
          <Route path="/admin/add-restaurant" element={<PrivateRoute><AddRestaurantPage /></PrivateRoute>} />
          <Route path="/admin/all-reservations" element={<PrivateRoute><ReservationsPage /></PrivateRoute>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

