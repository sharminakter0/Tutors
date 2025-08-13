import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import noBookdTutor from "../../../Animation - tutornot found.json";
import { FaStar } from "react-icons/fa6";
import Lottie from "lottie-react";
import axios from "axios";
import Rivew from "../../components/rivew/rivew";
import { envVars } from "../../config";

const BookedTutor = () => {
  const tutors = useLoaderData();
  const navigate = useNavigate();
  const [localReviews, setLocalReviews] = useState({});

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("tutorReviews")) || {};
    setLocalReviews(storedReviews);
  }, []);

  const handleReview = (id) => {
    axios
      .patch(`${envVars.backend_origin}/tutor/${id}/review`)
      .then((res) => {
        if (res.status === 200) {
          alert("Thanks for your review!");
          navigate("/find-tutior");
          const updated = { ...localReviews };
          updated[id] = (updated[id] || 0) + 1;
          localStorage.setItem("tutorReviews", JSON.stringify(updated));
          setLocalReviews(updated);
        }
      })
      .catch((err) => {
        console.error("Review error:", err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-center text-3xl font-bold my-4 text-red-500 dark:text-red-400">
        My Booked Tutors ({tutors.length})
      </h1>

      {tutors.length === 0 ? (
        <div className="text-center mt-10 flex flex-col justify-center items-center">
          <Lottie style={{ width: "220px" }} animationData={noBookdTutor} loop />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            You haven’t booked any tutors yet.
          </p>
          <a href="/find-tutior" className="btn btn-outline mt-4">
            Browse Tutors
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Photo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Language</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Your Review</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tutors.map((tutor) => {
                const id = tutor.tutorId || tutor._id;
                return (
                  <tr key={id}>
                    <td className="px-4 py-3">
                      <img
                        src={tutor.image || "https://via.placeholder.com/100"}
                        alt={tutor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{tutor.name}</td>
                    <td className="px-4 py-3 text-sm">{tutor.language}</td>
                    <td className="px-4 py-3 text-sm">${tutor.price}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <Rivew tutorId={id} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {localReviews[id] ?? tutor.review ?? 0}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleReview(id)}
                        className="btn btn-sm btn-primary"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookedTutor;
