import React, { useContext } from 'react';
import { Link } from 'react-router'; // Change to 'react-router-dom' if needed
import { AuthContext } from '../Auth/AuthProvider';
import logo from '../../../logo.json';
import Lottie from 'lottie-react';
import { ThemeToggle } from '../ThemToogle/ThemeToggle';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogoutClick = () => logout();

  return (
    <div className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="w-11/12 mx-auto ">
        <div className="navbar py-3 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Lottie animationData={logo} loop={true} style={{ width: '60px' }} />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden lg:inline">
              Language Master
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal ">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li><Link to="/all-campaigns" className="hover:text-accent">All Campaigns</Link></li>
               <li><Link to="/find-tutior" className="hover:text-accent">Find Tutors</Link></li>

              {user && (
                <>
                 
                  {/* <li><Link to="/find-tutior" className="hover:text-accent"> Dash board</Link></li> */}
                  
                  <li><Link to="/add-tutiour" className="hover:text-accent">Add Tutors</Link></li>
                  <li><Link to="/my-booked-tutors" className="hover:text-accent">My Booked Tutors</Link></li>
                  <li><Link to="/my-tutor" className="hover:text-accent">My Added Tutors</Link></li>
                
                </>
              )}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <button
                  onClick={handleLogoutClick}
                  className="btn btn-sm btn-outline text-white border-white hover:border-accent hover:text-accent"
                >
                  Logout
                </button>
                <div className="dropdown dropdown-end tooltip tooltip-left" data-tip={user.displayName}>
                  <div tabIndex={0} className="avatar">
                    <div className="w-8 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} alt="Profile" />
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-black rounded-box w-52 p-2 shadow">
                    <li><span>{user.displayName}</span></li>
                    <li><span>{user.email}</span></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm text-white border-white hover:border-accent hover:text-accent">Login</Link>
                <Link to="/register" className="btn btn-outline btn-sm text-white border-white hover:border-accent hover:text-accent">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-2 p-3 shadow bg-base-100 rounded-box w-52 text-blue-700">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-campaigns">All Campaigns</Link></li>

              {user && (
                <>
                  <li><Link to="/find-tutior">Find Tutors</Link></li>
                  <li><Link to="/add-tutiour">Add Tutors</Link></li>
                  <li><Link to="/my-booked-tutors">My Booked Tutors</Link></li>
                  <li><Link to="/my-tutor">My Added Tutors</Link></li>
                
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
