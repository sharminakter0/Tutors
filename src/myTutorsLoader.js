import { getAuth } from "firebase/auth";
import { envVars } from "./config";

export const myTutorsLoader = async () => {
  const auth = getAuth();
  const user = auth.currentUser

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const token = await user.getIdToken();

  const res = await fetch(`${envVars.backend_origin}/mytutors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load My Tutors");
  }

  return res.json();
};
