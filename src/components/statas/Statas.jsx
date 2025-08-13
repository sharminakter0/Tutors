import React, { useEffect, useState } from 'react';
import CountUp from '../react bits/CountUP';
import { envVars } from '../../config';

const Statas = () => {
  const [promise, setPromise] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch tutors
  useEffect(() => {
    fetch(`${envVars.backend_origin}/addtutior`)
      .then(res => res.json())
      .then(data => setPromise(data));
  }, []);

  // Fetch total users
  useEffect(() => {
    fetch(`${envVars.backend_origin}/userstats`)
      .then(res => res.json())
      .then(data => setTotalUsers(data.totalUsers))
      .catch(err => console.error('Error fetching total users:', err));
  }, []);

  // Calculating statistics
  const totalTutors = promise.length;
  const totalReviews = promise.reduce((sum, tutor) => sum + Number(tutor.review), 0);
  const totalLanguages = [...new Set(promise.map(tutor => tutor.language.trim()))].length;

  const stats = [
    { label: 'Total Tutors', value: totalTutors, color: 'bg-base-100 shadow-lg shadow-[#92a4ec] border-[#768dec] border-3', textColor: 'text-blue-600' },
    { label: 'Total Reviews', value: totalReviews, color: 'bg-base-100 shadow-lg shadow-[#aff9b5] border-[#96f09d] border-3', textColor: 'text-green-600' },
    { label: 'Total Languages', value: totalLanguages, color: 'bg-base-100 shadow-lg shadow-[#f7f284] border-[#f0e36d] border-3', textColor: 'text-yellow-600' },
    { label: 'Total Users', value: totalUsers, color: 'bg-base-100 shadow-lg shadow-[#e8a4ee] border-[#ba2fc6] border-3', textColor: 'text-purple-600' },
  ];

  return (
    <section className="my-16 ">
      <h2 className="text-3xl font-bold text-center text-primary mb-10"> Our statas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className={`rounded-xl shadow-md p-6 text-center ${item.color}`}>
            <p className="text-md font-medium text-gray-500">{item.label}</p>
            <p className={`text-3xl font-bold ${item.textColor}`}>
              <CountUp
                from={0}
                to={item.value}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text"
              /> +
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statas;
