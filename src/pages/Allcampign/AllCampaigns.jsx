import React, { useState, useEffect } from 'react';
import { envVars } from '../../config';
import { Link } from 'react-router'; // ✅ fixed import

const AllCampaigns = () => {
  const [tutors, setTutors] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetch(`${envVars.backend_origin}/addtutior`)
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error('Failed to fetch tutors:', err));
  }, []);

  // Get unique categories
  const categories = [...new Set(tutors.map(t => t.category).filter(Boolean))];

  // Filter + Sort
  const filteredTutors = tutors.filter(tutor =>
    categoryFilter ? tutor.category === categoryFilter : true
  );

  const sortedTutors = [...filteredTutors].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'language') return a.language.localeCompare(b.language);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="w-11/12 mx-auto  py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <div className="w-full lg:w-1/4 bg-base-200 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer px-3 py-2 rounded ${!categoryFilter ? 'bg-primary text-white' : 'hover:bg-base-300'}`}
              onClick={() => setCategoryFilter('')}
            >
              All Categories
            </li>
            {categories.map((cat, index) => (
              <li
                key={index}
                className={`cursor-pointer px-3 py-2 rounded ${categoryFilter === cat ? 'bg-primary text-white' : 'hover:bg-base-300'}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-center md:text-left">All Campaigns</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Sort By</option>
              <option value="name">Name (A-Z)</option>
              <option value="language">Language (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          {/* Tutor Grid */}
          {sortedTutors.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No tutors found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTutors.map((tutor, index) => (
                <div
                  key={index}
                  className="bg-base-100 rounded-xl border shadow hover:shadow-md p-4 flex flex-col"
                >
                  <img
                    src={tutor.image || 'https://via.placeholder.com/300x180'}
                    alt={tutor.name}
                    className="w-full h-30 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-1">{tutor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {tutor.category} | {tutor.language}
                  </p>
                  <p className="text-sm mb-4 flex-grow">
                    {tutor.description?.slice(0, 60) || "No description available."}...
                  </p>
                  <Link to={`/tutor-details/${tutor._id}`}>
                    <button className="btn btn-primary btn-sm w-full">See More</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AllCampaigns;
