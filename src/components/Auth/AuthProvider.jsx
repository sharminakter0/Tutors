import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";

// google provider
const Provider = new GoogleAuthProvider();

// create auth context

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    console.log("User Changed:", user);
  }, [user]);

  // firebase create user
  const createUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // firebase observe

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
      const getToken = async () => {
        if (currentUser) {
          try {
            const token = await currentUser.getIdToken();
            localStorage.setItem("access-token", token); // Save token for later
            console.log(" Firebase Access Token:", token);
          } catch (err) {
            console.error(" Failed to get Firebase token:", err);
          }
        } else {
          localStorage.removeItem("access-token");
        }
      };

      getToken();
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // firebase login
  const login = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update user profile

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  //google log in
  const gLogin = () => {
    return signInWithPopup(auth, Provider);
  };

  // firebse loguut

  const logout = () => {
    return signOut(auth);
  };
  const authData = {
    createUser,
    user,
    /**@deprecated Do not use this function */
    setUser: setUser,
    logout,
    login,
    updateUser,
    loading,
    setLoding,
    gLogin,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
