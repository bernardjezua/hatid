import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'universal-cookie';
import logo from "../images/hatid_logo.png";
import Farmer from "../images/FArm2U.jpg";
import Space from "../images/green.jpg";

export default function SignUp() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/mainpage")
    }
  }, [isLoggedIn, navigate])

  function signUp(e) {
    e.preventDefault();

    // to validate

    fetch("http://localhost:3001/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: document.getElementById("s-name").value,
          email: document.getElementById("s-email").value,
          password: document.getElementById("s-password").value
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          alert("Successfully sign up!")
        }
        else { alert("Sign up failed")}
      })
  }


  return (
      <div class="flex bg-dark-green items-center justify-center h-screen">
        <div class="flex items-center justify-center h-screen">
            <img src={Farmer} alt="Farmer" class="w-120 h-90 object-cover" />
            <img src={Space} alt="space" class="w-16 h-16" />
        </div>
        <div class="title_container flex items-center text-center">
          <form>
          <div class="title_container flex items-center text-center">
          <img src={Space} alt="Space" class="w-6 h-6" />
          <img src={logo} alt="Hatid Logo" class="w-12 h-12" />
          <img src={Space} alt="Space" class="w-3 h-3" />
            <h2 class="text-3xl text-yellow-500">Sign Up</h2>
            </div>
            <img src={Space} alt="Space" class="w-6 h-6" />
            <div class="input_field relative mb-8">
                    <input id="s-name" type="text" name="name" placeholder="Full Name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div class="input_field relative mb-8">
                    <input id="s-email" type="email" name="email" placeholder="Email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div class="input_field relative mb-8">
                    <input id="s-password" type="password" name="password" placeholder="Password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div class="input_field relative mb-8">
                <input type="password" name="password" placeholder="Re-type Password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
              </div>
                  <Link to="/login">
                    <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow">
                      Register
                    </button>
                  </Link>
                </form>
              </div>
              </div>
      
    
  );
}
