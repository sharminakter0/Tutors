import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { envVars } from '../../config';

const OurTutors
 = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
   fetch(`${envVars.backend_origin}/addtutior`)
      .then((res) => res.json())
      .then((data) => {
        console.log (data)
        // Pick 4 random items from the array
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTutors(shuffled.slice(0, 8));
      });
  }, []);

  return (
    <section className="my-16 ">
      <h2 className="text-3xl font-bold text-center text-primary mb-2">
         Tutor Example 
      </h2>
      <p className='text-center text-sm mb-10'>Learn any language from skilled professionals with years of teaching experience.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-base-100 border-1 rounded-lg shadow-md overflow-hidden p-2 flex flex-col justify-between"
          >
            <img
              src={tutor.image || 'https://via.placeholder.com/400x250'}
              alt={tutor.name}
              className="h-35 w-full object-cover rounded-lg"
            />
            <div className="pt-2 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold  mb-2">{tutor.name}</h3>
              <p className="text-sm text-gray-600 flex-grow">
                {tutor.description?.slice(0, 50) || 'No description available'}...
              </p>
              <Link
                to={`/tutor-details/${tutor._id}`}
                className="btn btn-sm btn-outline btn-primary mt-4 self-start"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTutors
;
