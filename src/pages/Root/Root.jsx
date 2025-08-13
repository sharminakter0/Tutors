import React from 'react';
import Nav from '../../components/Header/Nav';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const Root = () => {
  return (
    <div className="min-h-screen bg-base-200  flex flex-col justify-between">
      {/* Top: Navbar */}
      <Nav />

      {/* Middle: Dynamic Page Content */}
      <main className="flex-grow ">
        <Outlet />
      </main>

      {/* Bottom: Footer */}
      <Footer />
    </div>
  );
};

export default Root;
