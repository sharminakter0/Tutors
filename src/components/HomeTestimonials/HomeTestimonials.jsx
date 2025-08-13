import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router';


const HomeTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "High School Student",
      feedback: "Amazing tutor platform! My English grades improved from C to A in just 3 months. The tutors are patient and explain concepts clearly.",
      rating: 5,
      avatar: "https://i.ibb.co/8g5xxfHL/pexels-mikhail-nilov-9159054.jpg"
    },
    {
      name: "Alex Chen",
      role: "College Student",
      feedback: "Found the perfect Bangla tutor who helped me ace my Langauge course. The scheduling system is super convenient!",
      rating: 5,
      avatar: "https://i.ibb.co/sdW0b85r/pexels-artempodrez-6990444.jpg"
    },
    {
      name: "Maria Garcia",
      role: "Parent",
      feedback: "My daughter struggled with japnis langauge until we found Master Language. Now she's confident and actually enjoys the Language! Worth every penny.",
      rating: 4,
      avatar: "https://i.ibb.co/Txk4065L/pexels-yankrukov-8197535.jpg"
    },
    {
      name: "David Kim",
      role: "Adult Learner",
      feedback: "As a working professional, I needed flexible Spanish lessons. My tutor adapts perfectly to my schedule and learning pace.",
      rating: 5,
      avatar: "https://i.ibb.co/KpsDQ6dg/pexels-max-fischer-5212339.jpg"
    }
  ];

  return (
    <section className="bg-base-200 ">
      <div className=" mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">What Our Students Say</h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community of learners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all  duration-300"
            >
              <div className="card-body p-8">
                <FaQuoteLeft className="text-3xl text-primary opacity-20 mb-4" />
                
                <p className="italic text-lg mb-6 relative">
                  <span className="absolute -left-2 -top-2 text-primary opacity-30 text-4xl">"</span>
                  {testimonial.feedback}
                  <span className="absolute -right-2 -bottom-2 text-primary opacity-30 text-4xl">"</span>
                </p>
                
                <div className="flex items-center">
                  <div className="avatar mr-4">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-base-content/70 mb-1">{testimonial.role}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
            <Link to={'/register'}>
            <button className="btn btn-primary btn-lg px-8 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Read More Testimonials
          </button>
            </Link>
          
        </motion.div>
      </div>
    </section>
  );
};

export default HomeTestimonials;