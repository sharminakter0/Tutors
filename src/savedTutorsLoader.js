import { redirect } from "react-router";
import { envVars } from "./config";

export const savedTutorsLoader = async () => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`${envVars.backend_origin}/savedtutor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 404 means "no tutors found" (we treat that as an empty list)
  if (response.status === 404) {
    return []; // return empty tutors array for new users
  }

  // Other errors (e.g. 500 server error) should be thrown
  if (!response.ok) {
    throw new Error("Failed to load saved tutors");
  }

  // Valid data
  return response.json();
};
