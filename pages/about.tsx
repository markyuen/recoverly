import React from "react";
import Header from "../components/Common/Header";
import ShopNav from "../components/layouts/ShopNav";
import ProtectedRoute from "../components/route/ProtectedRoute";

const About = () => {
  return (
    <ProtectedRoute>
      <ShopNav>
        <Header name="About Us" />
        <p className="ml-6 mt-4">About Us</p>
      </ShopNav>
    </ProtectedRoute>
  );
};

export default About;
