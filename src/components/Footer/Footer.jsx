import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Language Master</h2>
            <p className="text-sm text-gray-200">
              Helping learners connect with expert tutors worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/find-tutior" className="hover:underline">Find Tutors</Link></li>
              <li><Link to="/add-tutiour" className="hover:underline">Add Tutors</Link></li>
              <li><Link to="/my-booked-tutors" className="hover:underline">My Booked Tutors</Link></li>
              <li><Link to="/my-tutor" className="hover:underline">My Added Tutors</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm">Email: <span className="text-gray-200">support@lm.com</span></p>
            <p className="text-sm">Phone: <span className="text-gray-200">(123) 456-7890</span></p>
          </div>
        </div>

        {/* Bottom Copy Section */}
        <div className="mt-10 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} Language Master. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
