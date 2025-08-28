import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if admin credentials
      if (email === "admin@123" && password === "teamnexus05@") {
        alert("Admin logged in!");
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else {
        await login(email, password);
        alert("Logged in!");
        navigate("/dashboard"); // ✅ after login redirect
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      alert("Google Login Success!");
      navigate("/dashboard"); // ✅ redirect after google login
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg 
                         bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg 
                         bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-sm text-blue-400 hover:underline"
                onClick={() => alert("Redirect to Forgot Password Page")}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-700" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        {/* Create Account Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don’t have an account? </span>
          <Link to="/register" className="text-blue-400 hover:underline">
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ResQ.AI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
