import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("rescue");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(username, password, role);
    setMessage(result.message);
    if (result.success) {
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-teal-400">🆕 Signup</h2>
        {message && <p className="text-gray-400">{message}</p>}
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
        <select
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="rescue">Rescue Team</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-semibold"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
