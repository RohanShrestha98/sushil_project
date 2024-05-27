import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import EsewaSuccess from "../pages/EsewaSuccess";
import CarDetails from "../pages/CarDetails";
import BikeListing from "../pages/BikeListing";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import AuthContext from "../components/contexts/authContext";
import VendorSignup from "../pages/Vendor";
import TermsAndConditions from "../pages/TermsAndConditions";
// import EsewaSuccess from "../components/payment/esewa/esewaSuccess";

import VehicleRentForm from "../pages/VehicleRentForm";

const Routers = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      {isLoggedIn() && <Route path="/profile" element={<Profile />} />}
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<VehicleRentForm />} />
      <Route path="/bikes" element={<BikeListing />} />
      <Route path="/esewa_payment_success" element={<EsewaSuccess />} />
      {/* <Route path="/blogs/:slug" element={<BlogDetails />} /> */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/terms-condition" element={<TermsAndConditions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
