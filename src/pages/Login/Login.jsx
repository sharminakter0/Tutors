import React, { use } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../components/Auth/AuthProvider";
import Lottie from "lottie-react";
import loginLottie from "../../../Animation - login.json";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, gLogin } = use(AuthContext);

  // login for email and pass

  const handleLogin = (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    console.log(password, email);

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        const errorMessage = err.message;

        alert(errorMessage);
      });
  };
  //   handle google log in
  const handleGooleLogin = () => {
    gLogin()
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        console.log(result);
      })
      .catch((err) => {
        const errorMessage = err.message;

        alert(errorMessage);
      });
  };

  return (
    <div className=" flex flex-col lg:flex-row-reverse justify-center items-center">
      <div>
        <Lottie
          style={{ width: "250px", height: "450px" }}
          animationData={loginLottie}
          loop={true}
        />
        ;
      </div>
      <form onSubmit={handleLogin} className="">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-opacity-10 border-white  mx-auto my-10 ">
          <div className="card-body p-8">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-center text-sm opacity-75 mb-8">
              Sign in to your account
            </p>

            <fieldset className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  name="email"
                />
              </div>

              <div className="form-control">
                <div className="flex justify-between items-center">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <a className="label-text-alt link link-hover text-xs">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                  name="password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-6 hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </fieldset>

            <div className="divider my-6">OR</div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGooleLogin}
                className="btn btn-outline btn-circle hover:bg-base-200 transition-colors"
              >
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
              <button className="btn btn-outline btn-circle hover:bg-base-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
              <button className="btn btn-outline btn-circle hover:bg-base-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
            </div>

            <p className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link to={"/register"} className="link link-primary font-medium">
                {" "}
                Sign up{" "}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
