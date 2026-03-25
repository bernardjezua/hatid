import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import logo from "../images/hatid_logo.png";
import Farmer from "../images/FArm2U.jpg";
import Space from "../images/green.jpg";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-password").value;

    try {
      const response = await fetch("http://127.0.0.1:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();

      if (body.success) {
        // Use global login function to set state and localStorage consistently
        login(body.user, body.token);
        
        if (body.user.role === 'admin') {
            navigate("/admin");
        } else {
            navigate("/");
        }
      } else {
        setError(`${body.debug_message || body.message || "Invalid credentials"} (Code: ${body.error_code || "UNKNOWN"})`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 flex flex-col md:flex-row">
      {/* Left side: Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary-800 items-center justify-center p-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
            <img src={Space} alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center">
            <img src={Farmer} alt="Farmer" className="w-96 rounded-2xl shadow-2xl mb-8 transform -rotate-2" />
            <h1 className="text-4xl font-bold text-white mb-4">Farm to Table</h1>
            <p className="text-primary-100 text-lg max-w-md mx-auto">Helping local farmers reach your doorstep with fresh, organic produce.</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-neutral-light">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <img src={logo} alt="HATID Logo" className="w-20 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-primary-900">Welcome Back</h2>
            <p className="text-neutral-500 mt-2">Log in to your HATID account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
              <input 
                id="l-email" 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
              <input 
                id="l-password" 
                type="password" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 mt-4 rounded-lg transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center mt-8 text-neutral-600">
            Don't have an account? <Link to="/signup" className="text-primary-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
