import React from 'react';

const About= () => {
  return (
    <div className=" w-11/12 mx-auto py-12 px-4  my-12">
      <h1 className="text-4xl font-bold text-center  mb-3 text-primary">About Us</h1>
      <p className="text-lg text-gray-600  mb-10 text-center">
        Welcome to Language Master — a space where learners connect, grow, and achieve fluency together.
We believe that sharing ideas, practicing skills, and exchanging cultural insights creates a powerful language learning community.
      </p>
      <div className="grid md:grid-cols-2  gap-10 items-start">
        <div>
          <h2 className="text-2xl text-primary font-semibold  mb-2">Our Mission</h2>
          <p className="">
            Our mission is to empower learners to master new languages, connect with expert tutors, and explore diverse cultures.
We provide a platform for interactive lessons, personalized learning plans, and meaningful connections that inspire confidence and fluency.


          </p>
        </div>
        <div>
          <h2 className="text-2xl text-primary font-semibold  mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside  space-y-2">
            <li>Expert tutors with proven teaching experience.</li>
            <li>Lessons customized to your goals and skill level.</li>
            <li>Learn from anywhere, on any device.</li>
            <li>Supportive, motivating, and interactive learning environment.</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 mb-8 text-center text-gray-600">
       Join Language Master today and start your journey toward mastering the language you’ve always dreamed of speaking!
      </p>
    </div>
  );
};

export default About;
