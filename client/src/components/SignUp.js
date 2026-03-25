import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/hatid_logo.png";
import Farmer from "../images/FArm2U.jpg";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await fetch("http://127.0.0.1:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      
      const body = await response.json();
      
      if (body.success) {
        navigate("/login");
      } else {
        setError(body.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex bg-neutral-light min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:order-2">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
          <div className="text-center mb-6 lg:hidden">
            <img src={logo} alt="HATID Logo" className="w-20 h-20 mx-auto mb-2" />
          </div>
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-6">Create Account</h2>
          
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">{error}</div>}
          
          <form onSubmit={signUp} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-neutral-dark mb-1">First Name</label>
                <input 
                  type="text" 
                  value={firstName} onChange={e => setFirstName(e.target.value)}
                  placeholder="Juan" 
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" required 
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-neutral-dark mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={lastName} onChange={e => setLastName(e.target.value)}
                  placeholder="Dela Cruz" 
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-1">Email Address</label>
              <input 
                type="email" 
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-1">Password</label>
              <input 
                type="password" 
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" required 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Sign Up
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 items-center justify-center relative overflow-hidden lg:order-1">
        <img src={Farmer} alt="Farmer" className="w-full h-full object-cover opacity-60 absolute" />
        <div className="z-10 text-center p-8 bg-black bg-opacity-40 rounded-xl">
          <img src={logo} alt="HATID Logo" className="w-32 h-32 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-bold text-neutral-light">Join HATID</h1>
          <p className="text-primary-100 mt-2 text-lg">Connect with local farmers directly.</p>
        </div>
      </div>
    </div>
  );
}
