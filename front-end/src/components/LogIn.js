import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import logo from "../images/hatid_logo.png";
import Farmer from "../images/FArm2U.jpg";
import Space from "../images/green.jpg";

export default function LogIn() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/mainpage")
    }
  }, [isLoggedIn, navigate])

  function logIn(e) {
    e.preventDefault();
  
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("l-email").value,
        password: document.getElementById("l-password").value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((body) => {
        if (body.success) {
          setIsLoggedIn(true);
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3000/",
            age: 60 * 60,
            sameSite: false,
          });
  
          localStorage.setItem("username", body.username);
        } else {
          alert("Log in failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An unexpected error occurred during login. Please try again.");
      });
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
          <img src={Space} alt="Space" class="w-8 h-8" />
          <img src={logo} alt="Hatid Logo" class="w-12 h-12" />
          <img src={Space} alt="Space" class="w-3 h-3" />
            <h2 class="text-3xl text-yellow-500">Log In</h2>
            </div>
            <img src={Space} alt="Space" class="w-6 h-6" />
                  <div class="input_field relative mb-8">
                    <input id="l-email" type="email" name="email" placeholder="Email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div class="input_field relative mb-8">
                    <input id="l-password" type="password" name="password" placeholder="Password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                  </div>
                  <Link to="/">
                    <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <p class="credit text-yellow-500">New to Hatid?<a href="#" class="text-white-500" target="_blank"> Sign Up!</a></p>
                  </Link>
                </form>
              </div>
              </div>
      
    
  );
}
