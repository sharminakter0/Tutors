import React, { useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router';

const FindTutior = () => {
  const data = useLoaderData();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  // Category Filter
  const categoryFiltered = selectedCategory
    ? data.filter(tutor =>
        tutor.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    : data;

  // Search Filter
  const searchFiltered = categoryFiltered.filter(tutor => {
    const search = submittedSearch.toLowerCase();
    return (
      tutor.name.toLowerCase().includes(search) ||
      tutor.category.toLowerCase().includes(search) ||
      tutor.language.toLowerCase().includes(search) ||
      tutor.email.toLowerCase().includes(search)
    );
  });

  // Sorting
  const sortedData = [...searchFiltered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'language') return a.language.localeCompare(b.language);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const handleSearch = () => setSubmittedSearch(searchTerm);

  return (
    <div className="w-11/12 mx-auto   py-10  ">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex w-full md:w-2/3 gap-2">
          <input
            type="text"
            placeholder="Search by name, language, category or email..."
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-500 bg-base-100 dark:bg-gray-800 text-gray-500 dark:text-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 btn  btn-primary text-white rounded-lg transition"
          >
            Search
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-base-100
          dark:bg-gray-800 text-gray-500 dark:text-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="language">Language (A-Z)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      {/* Table View */}
      {sortedData.length === 0 ? (
        <p className="text-center   text-xl">No tutors found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-base-300  ">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Photo</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Language</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-base-100 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedData.map((tutor, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <img
                      src={tutor.image || 'https://via.placeholder.com/80'}
                      alt={tutor.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm">{tutor.name}</td>
                  <td className="px-4 py-3 text-sm">{tutor.category}</td>
                  <td className="px-4 py-3 text-sm">{tutor.language}</td>
                  <td className="px-4 py-3 text-sm">{tutor.email}</td>
                  <td className="px-4 py-3 text-sm">{tutor.rating || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <Link to={`/tutor-details/${tutor._id}`}>
                    <button className="btn btn-sm btn-outline btn-primary">See More</button>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FindTutior;
