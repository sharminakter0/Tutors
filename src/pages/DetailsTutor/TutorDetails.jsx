import React, { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../components/Auth/AuthProvider";
import { getSavedTutors } from "../../api-check";
import Swal from "sweetalert2";
import { envVars } from "../../config";

const TutorDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      if (user && typeof user.getIdToken === "function") {
        try {
          const token = await user.getIdToken();
          console.log({ token });
          const data = await getSavedTutors(token);
          console.log({ data });
        } catch (error) {
          console.error("Token fetch error:", error);
        }
      }
    };

    fetchTokenAndData();
  }, [user]);

  //     const blinkAnimation = {
  //   animate: {
  //     backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  //     transition: {
  //       duration: 3,
  //       repeat: Infinity,
  //       ease: 'linear',
  //     },
  //   },
  // };

  const handleBookClick = async (data, user) => {
    try {
      if (!user) {
        alert("Please log in first!");
        return;
      }
      console.log(user);
      // Get Firebase ID token
      const token = await user.getIdToken();
      console.log({ token });

      // Destructure data
      const {
        _id,
        review,
        price,
        name,
        language,
        image,
        description,
        category,
      } = data;

      // Send POST request with Authorization header
      const res = await axios.post(
        `${envVars.backend_origin}/savedtutor`,
        {
          _id,
          review,
          price,
          name,
          language,
          image,
          description,
          category,
          // Don't include email here - backend will add it from the token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach Firebase token
          },
        }
      );
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: "You successfully booked this tutor.",
        });
        navigate("/my-booked-tutors");
      }
    } catch (err) {
      console.error("Booking error:", err, { data, user });
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: " This  Teacher already booked by another user  try another one.",
      });
    }
  };

  const data = useLoaderData();
  const { id } = useParams();
  // console.log(data,id)
  const findData = data.find((item) => item._id == id);
  //console.log(findData)
  const { _id, review, price, name, language, image, description, category } =
    findData;
  return (
    <div>
      <h1 className="text-4xl text-center my-3 font-bold  border py-2 ">
        {" "}
        Best
        <motion.span
          animate={{
            color: [
              "#ff4d4d",
              "#ffa500",
              "#00cc66",
              "#3399ff",
              "#cc33ff",
              "#ff4d4d",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-4xl font-bold"
        >
          {" "}
          {language}{" "}
        </motion.span>{" "}
        Teacher
      </h1>
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto p-4">
        <figure className="w-full lg:w-1/3 p-4">
          <img
            src={image}
            alt={name}
            className="rounded-xl w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3">
          <h2 className="card-title text-2xl font-bold text-blue-700">
            {name}
          </h2>
          {/* <p className="text-sm text-gray-500 mb-2">Email: {email}</p> */}
          <p>
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p>
            <span className="font-semibold">Language:</span> {language}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${price}
          </p>
          <p>
            <span className="font-semibold">Review:</span> ⭐ {review}
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Description:</span> {description}
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              onClick={() => handleBookClick(findData, user)}
              className="btn bg-gradient-to-r from-indigo-500  to-emerald-500 w-full hover:text-white"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
