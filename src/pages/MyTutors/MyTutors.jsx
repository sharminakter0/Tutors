import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../components/Auth/AuthProvider";
import { envVars } from "../../config";
import { div } from "framer-motion/client";

const MyTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [editingTutor, setEditingTutor] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${envVars.backend_origin}/addtutior`)
      .then((res) => {
        const myTutors = res.data.filter((tutor) => tutor.email === user.email);
        setTutors(myTutors);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${envVars.backend_origin}/addtutior/${id}`);
      setTutors((prev) => prev.filter((t) => t._id !== id));
      Swal.fire("Deleted!", "Tutor has been removed.", "success");
    }
  };

  const handleUpdate = (tutor) => {
    setEditingTutor(tutor);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      image: form.image.value,
      language: form.language.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      review: parseInt(form.review.value),
    };

    const res = await axios.patch(
      `${envVars.backend_origin}/addtutior/${editingTutor._id}`,
      updated
    );
    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Tutor info has been updated.", "success");
      setEditingTutor(null);
      const { data } = await axios.get(`${envVars.backend_origin}/addtutior`);
      setTutors(data.filter((tutor) => tutor.email === user.email));
    }
  };

  return (
    <>
    {
      tutors.length === 0 ?<div className="flex justify-center my-10"> <span className="loading loading-bars loading-xl text-center"></span>  </div>  :  <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl text-primary font-bold mb-6 text-center">My Tutors ({tutors.length})</h2>

      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Photo</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Language</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Review</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tutors.map((tutor) => (

              <tr key={tutor._id}>
                <td className="px-4 py-3">
                  <img
                    src={tutor.image || "https://via.placeholder.com/100"}
                    alt={tutor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{tutor.name}</td>
                <td className="px-4 py-3">{tutor.language}</td>
                <td className="px-4 py-3">৳ {tutor.price}</td>
                <td className="px-4 py-3">{tutor.review || 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(tutor)}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 space-y-3 text-gray-800 dark:text-gray-100"
          >
            <h3 className="text-xl font-bold ">Update Tutor</h3>
            <input
              type="text"
              readOnly
              defaultValue={editingTutor.name}
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="text"
              readOnly
              defaultValue={editingTutor.email}
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="text"
              name="image"
              defaultValue={editingTutor.image}
              className="input input-bordered w-full"
              placeholder="Image URL"
            />
            <input
              type="text"
              name="language"
              defaultValue={editingTutor.language}
              className="input input-bordered w-full"
              placeholder="Language"
            />
            <input
              type="number"
              name="price"
              defaultValue={editingTutor.price}
              className="input input-bordered w-full"
              placeholder="Price"
            />
            <textarea
              name="description"
              defaultValue={editingTutor.description}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            <input
              type="number"
              name="review"
              defaultValue={editingTutor.review || 0}
              className="input input-bordered w-full"
              placeholder="Review"
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setEditingTutor(null)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>

    }
    
    </>
   
  );
};

export default MyTutors;
