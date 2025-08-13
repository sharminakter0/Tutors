import React from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "https://i.ibb.co/rRtWw7sV/young-mother-working-from-home-with-daughter.jpg",
    title: "Welcome to Language Master",
    desc: "Discover, explore, and master your favorite languages with top-rated tutors.",
    btnText: "Browse Tutors",
    btnLink: "/find-tutior",
  },
  {
    img: "https://i.ibb.co.com/RTT2hFzQ/happy-teacher-with-students-background.jpg",
    title: "Learn Anytime, Anywhere",
    desc: "Your learning journey is just a click away. Start today and see progress tomorrow.",
    btnText: "Find Tutors",
    btnLink: "/all-campaigns",
  },
  {
    img: "https://i.ibb.co.com/mrdKTgf8/father-helping-little-son-with-homework.jpg",
    title: "Expert Tutors at Your Fingertips",
    desc: "Connect with native speakers and professional teachers from around the globe.",
    btnText: "Meet Tutors",
    btnLink: "/find-tutior",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="bg-blue-100 w-11/12 mx-auto rounded-3xl mt-4 shadow-lg  ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="">
            <div className="hero min-h-[70vh] px-15   ">
              <div className="hero-content flex-col lg:flex-row-reverse gap-20">
                <motion.img
                  src={slide.img}
                  className="max-w-sm w-full lg:h-80  h-60 rounded-lg shadow-2xl"
                  alt={slide.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                />

                {/* text section */}
                <div className="text-center lg:text-left">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-primary mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    className="py-4 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {slide.desc}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Link to={slide.btnLink} className="btn btn-primary mt-2">
                      {slide.btnText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
