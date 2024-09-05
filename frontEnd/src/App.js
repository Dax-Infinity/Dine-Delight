import './App.css';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/Abouts';
import Contact from './pages/Contact';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NotFound from './pages/NotFound';
import ReservationsPage from './components/reservationPage/ReservationsPage';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import ReportPage from './components/report/ReportPage';
import Faq from './pages/Faq';
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
          <Route path="/reservation" element={<PrivateRoute><ReservationsPage /></PrivateRoute>} />
          <Route path="/faq" element={<PrivateRoute><Faq /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

