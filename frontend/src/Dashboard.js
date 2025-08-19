import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let username = "";

  try {
    const decoded = jwtDecode(token);
    username = decoded.username;
  } catch (err) {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Logout tracking failed");
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-md mt-20 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome {username}</h2>
      <p className="mb-4">This is your secure dashboard.</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <button
        onClick={() => navigate("/activity-log")}
        className="w-full mt-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
      >
        View Activity Log
      </button>
    </div>
  );
}

export default Dashboard;
