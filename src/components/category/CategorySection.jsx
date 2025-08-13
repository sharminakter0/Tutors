import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowRight, FaChalkboardTeacher } from 'react-icons/fa';
import { envVars } from '../../config';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${envVars.backend_origin}/addtutior`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map(tutor => tutor.category.trim()))];
        setCategories(uniqueCategories);
      });
  }, []);

  const handleClick = (category) => {
    navigate(`/find-tutior?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="my-16 ">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary">
        Explore Tutors by Category
      </h2>
      <p className="text-center text-base-content/80 mb-8">
        Find tutors based on your preferred learning categories.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">



        
        {categories.slice(0, 9).map((category, index) => (
          <div
            key={index}
            onClick={() => handleClick(category)}
            className="flex  items-center justify-between 
              bg-base-100  
               
              p-4 rounded-lg shadow-[#3e30df] hover:shadow-md  
              cursor-pointer transition"
          >


           
            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-blue-500 text-xl" />
              <span className="font-semibold">{category} Tutors</span>
            </div>
            <FaArrowRight className="text-gray-400 dark:text-gray-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
