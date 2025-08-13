import { FaSearch, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const HomeHowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Find Your Tutor",
      description: "Search from thousands of qualified tutors by subject, level, or availability.",
      color: "text-primary"
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: "Book Sessions",
      description: "Choose your preferred time and book instantly with our secure system.",
      color: "text-secondary"
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Start Learning",
      description: "Attend interactive sessions and track your progress with our dashboard.",
      color: "text-accent"
    }
  ];

  return (
    <section className=" mt-8 pb-16">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2 text-primary">How TutorBook Works</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 ">
            Get started with personalized learning in just three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full ${step.color} bg-base-200 border-4 border-base-100 shadow-lg`}>
                  {step.icon}
                </div>
              </div>
              
              <div className="card bg-base-200 shadow-xl pt-12 pb-8 px-6 h-full hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <span className="text-2xl font-bold bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-semibold mb-3 ${step.color}`}>{step.title}</h3>
                  <p className="text-base-content/80">{step.description}</p>
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
            <Link to={'/login'}>
            <button className="btn btn-primary btn-lg px-8">
            Get Started Now
          </button>
            </Link>
          
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHowItWorks;