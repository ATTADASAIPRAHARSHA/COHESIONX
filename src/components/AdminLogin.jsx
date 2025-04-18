import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../../auth";
import { useAuth } from "../contexts/authContext";

const AdminLogin = () => {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("Login not implemented");
  };

  const slideClass = mode === "login" ? "translate-x-0" : "-translate-x-1/2";

  return (
    <main className="w-full max-w-lg glass-morphism bg-[#181834]/90 rounded-3xl shadow-2xl px-3 py-8 flex flex-col items-center transition-all">
      <div className="flex flex-col items-center mb-3">
        <span className="bg-gradient-to-br from-primary to-blue-400 p-3 rounded-full mb-1 shadow-lg">
          <User className="w-9 h-9 text-white" />
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-playfair text-gradient-primary text-center tracking-tight">
          COHESION-X
        </h1>
        <span className="text-sm text-gray-400 font-inter tracking-wide">
          Admin Login
        </span>
      </div>
{/* 
      <div className="flex items-center w-full max-w-xs mx-auto bg-white/5 p-1 rounded-xl border border-gray-800 mb-5">
        <button
          className={`flex-1 py-2 rounded-xl transition-all duration-300 outline-none text-white ${mode === "login" ? "bg-gray-600 font-black" : ""}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 rounded-xl transition-all duration-300 outline-none text-white ${mode === "signup" ? "bg-gray-600 font-black" : ""}`}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
      </div> */}

      <div className="relative w-full max-w-md overflow-x-hidden h-[360px] sm:h-[330px] select-none">
      {/* <div className="relative w-full max-w-md overflow-x-hidden select-none"> */}
        <div className={`absolute top-0 left-0 flex w-[200%] h-full transition-transform duration-600 ease-in-out ${slideClass}`}>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-1/2 pr-2 flex flex-col gap-5 justify-center">
            <input
              type="email"
              placeholder="Email"
              value={loginValues.email}
              onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />
            <div className="relative">
              <input
                type={loginValues.showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginValues.password}
                onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
                className="px-4 py-3 pr-10 rounded-xl bg-[#1f1f35] text-white border border-primary/30 w-full"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("login")}
                className="absolute right-3 top-3 text-gray-400"
              >
                {loginValues.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
            >
              Login
            </button>
          </form>

          {/* Signup Form
          <form onSubmit={handleSignup} className="w-1/2 p-2 flex flex-col gap-5 justify-center">
            <input
              type="text"
              placeholder="Username"
              value={signupValues.username}
              onChange={(e) => setSignupValues({ ...signupValues, username: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={signupValues.email}
              onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />
            <div className="relative">
              <input
                type={signupValues.showPassword ? "text" : "password"}
                placeholder="Password"
                value={signupValues.password}
                onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
                className="px-4 py-3 pr-10 rounded-xl bg-[#1f1f35] text-white border border-primary/30 w-full"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("signup")}
                className="absolute right-3 top-3 text-gray-400"
              >
                {signupValues.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mt-2 bg-white text-black py-2 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <GoogleIcon /> Sign up with Google
            </button>
          </form> */}
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;