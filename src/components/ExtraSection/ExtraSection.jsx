import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
import { article } from 'framer-motion/client';


const ExtraSection = () => {
        

    
    const [topUsers, setTopUsers] = useState([]);
  const [latestTutor, setLatestTutor] = useState([]);


  // 🔹 Load all articles and compute Top Contributors
  useEffect(() => {
    fetch('https://tutorbook-ass-11.vercel.app/addtutior')
      .then(res => res.json())
      .then(data => {
        // ✅ Count articles by user
        const userMap = {};
        data.forEach(tutior => {
          const email = tutior.email;
          const name = tutior.name;
          
          const photoURL =tutior.image;
         
          
         

          if (!userMap[email]) {
            userMap[email] = { name, email,photoURL, count: 1 };
          } else {
            userMap[email].count += 1;
          }
        });

        const contributors = Object.values(userMap)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Top 5

        setTopUsers(contributors);
        setLatestTutor(data.slice(-3).reverse()); // Last 5
      });
  }, []);


    return (
        <div className=' mt-10 '>
       {/* ✅ Top Contributors */}
      <div className=' py-10 px-4 rounded-2xl '
       
      >
        <h2 className="text-3xl   text-center font-bold   mb-6 text-primary " >Top Contributors</h2>
        <p className='text-sm text-gray-500 text-center mb-6'>Meet the learners who go above and beyond in mastering languages and helping others succeed. <br />
Our top members actively participate in lessons, share learning tips, and inspire the community with their dedication and passion for communication.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-7 mb-8 ">
          {topUsers.map((user, index) => (
            <motion.div
            
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={index} className="border-blue-600 border shadow-md rounded p-4 bg-base-100 text-center">
                <img className='w-18 h-18 border-primary border-1 mx-auto rounded-full' src={article.photoURL ||"https://i.postimg.cc/CL6PszBM/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"}></img>
             
              <h3 className="font-semibold text-blue-600">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.count} Tutors</p>
            </motion.div>
          ))}
        </div>
      </div>

     {/* ✅ Latest Articles */}
      <div className='mb-10'
      >
        <h2 className="text-3xl text-center font-bold mb-5">Latest Tutors</h2>
        <p className='text-lg font-semibold mb-6 text-center'>Stay updated with the newest content from our community.</p>
        <Marquee><div className="grid grid-cols-3 lg:grid-cols-3 gap-8">
          {latestTutor.map(tutior => (

            
            <div key={tutior._id} className="p-3 bg-base-100  rounded-lg shadow-sm"
            >

              
              <figure>
                <img src={tutior.image || 'https://via.placeholder.com/400x200'} alt="Article" className="h-40 w-full object-cover rounded-lg" />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-bold">{tutior.category}</h3>
                <p className="text-sm text-gray-500">By {tutior.name || 'Unknown'}</p>

              </div>
            </div>
          ))}
        </div></Marquee>
      </div>         
        </div>
    );
};

export default ExtraSection;