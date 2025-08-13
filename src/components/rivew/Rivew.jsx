import React, { useEffect, useState } from 'react';
import { envVars } from '../../config';

const Rivew = ({ tutorId }) => {
  const [review, setReview] = useState(null);
 console.log( typeof tutorId)
  useEffect(() => {
    fetch(`${envVars.backend_origin}/addtutior`) // This fetches the full list
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const singleTutor = data.find(t =>  t._id === tutorId
 );
        console.log(singleTutor)
        if (singleTutor) {
          setReview(singleTutor.review);

        } else {
          setReview('N/A');
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setReview('Error');
      });
  }, [tutorId]);

  return (
    <p className="text-sm text-gray-700">Review: {review}</p>
  );
};

export default Rivew;
