import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "rescue") navigate("/rescue");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-teal-400">🔑 Login</h2>
        {error && <p className="text-red-400">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold"
        >
          Login
        </button>

        {/* 👇 Signup Link */}
        <p className="text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
