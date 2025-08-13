import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../components/Auth/AuthProvider";
import Lottie from "lottie-react";
import lottieRegister from "../../../Animation - 1749217664991.json";


const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const { createUser, updateUser,  gLogin } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const target = e.target;
    const name1 = target.fname.value;
    const photo = target.photo.value;
    const email = target.email.value;
    const password = target.password.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isLengthValid) {
      setPasswordError(
        "Password must be at least 6 characters and include both uppercase and lowercase letters."
      );
      return;
    }

    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        console.log({ result });
        // const user = result.user;
        updateUser({ displayName: name1, photoURL: photo })
          .then(() => {
            // setUser({ ...user, displayName: name1, photoURL: photo });

            // ✅ Save user info to MongoDB
            // axios
            //   .post(`${envVars.backend_origin}/register-user`, {
            //     email: email,
            //     name: name1,
            //   })
            //   .then((res) => {
            //     console.log("User added to MongoDB:", res.data);
            //   })
            //   .catch((err) => {
            //     console.error("MongoDB user insert failed:", err.message);
            //   });

            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleGooleLogin = () => {
    gLogin()
      .then((result) => {
        console.log({ result });
        // const user = result.user;
        // ✅ Save Google user to MongoDB
        // axios.post(`${envVars.backend_origin}/register-user`, {
        //   email: user.email,
        //   name: user.displayName,
        // })
        // .then((res) => {
        //   console.log("Google user saved to MongoDB:", res.data);
        // })
        // .catch((err) => {
        //   console.error("Google Mongo insert failed:", err.message);
        // });

        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center">
      <div>
        <Lottie
          style={{ width: "400px", height: "450px" }}
          animationData={lottieRegister}
          loop={true}
        />
      </div>

      <form onSubmit={handleRegister}>
        <div className="card bg-base-100 w-full max-w-md shadow-2xl border mx-auto my-20">
          <div className="card-body p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-center text-sm opacity-75 mb-8">
              Join our community today
            </p>

            <fieldset className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  name="fname"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="your@email.com"
                  name="email"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="https://your-photo.url"
                  name="photo"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                  name="password"
                  required
                />
                {passwordError && (
                  <label className="label">
                    <span className="label-text-alt text-xs text-red-500">
                      {passwordError}
                    </span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt text-xs opacity-70">
                    Minimum 6 characters, uppercase & lowercase
                  </span>
                </label>
              </div>

              <div className="form-control mt-2">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-sm">
                    I agree to the <a className="link link-primary">Terms</a>{" "}
                    and <a className="link link-primary">Privacy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Register
              </button>
            </fieldset>

            <div className="divider my-6">OR REGISTER WITH</div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGooleLogin}
                type="button"
                className="btn btn-outline btn-circle"
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              {/* You can add more providers here */}
            </div>

            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;