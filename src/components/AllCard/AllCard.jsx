import React from 'react';
import { Link } from 'react-router';
import { FaStar } from "react-icons/fa6";

const AllCard = ({cardData}) => {
  const {name,image,language,description,price,review,_id } = cardData
    return (
        <div className='mt-10'>
              <div 
  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row transition-all max-w-3xl mx-auto hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-300 mb-2"
>
  {/* Image Section */}
  <div className="md:w-2/5 relative">
    <div className="aspect-video md:aspect-auto md:absolute inset-0">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </div>

  {/* Content Section */}
  <div className="p-5 md:w-3/5 flex flex-col gap-3">
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        {name}
      </h2>
      
      <div className="flex items-center gap-2 mb-2">
        <div className='flex items-center gap-1'> < FaStar className=' text-yellow-500'/> <p> ( {review} )</p>  </div>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
         {language}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
        {description}
      </p>
    </div>

    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-indigo-700">${price}</span>
        <span className="text-gray-500 text-sm">/session</span>
      </div>
    <Link to={`/tutor-details/${_id}`}>
      
      <button 
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label={`Book ${name}`}
      >
        View Details
      </button>
      </Link>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default AllCard;

