import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from "../images/hatid_logo.png";
import profile from "../images/profile.png";
import shoppingcart from "../images/shoppingcart.png";
import dropbutton from "../images/dropbutton.png";


export default function NavigationBar(){
   const[isOpen, setIsOpen] = useState(false);

    return(
        <>
            <header className="bg-dark-green">
                <nav className="h-24 mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-14"> 
                    <div className="flex lg:flex-1 gap-x-8">
                        <Link to="/" className="text-xl leading-9 text-light-gray">
                            Home
                        </Link>
                        <div className="text-xl leading-9"> 
                        
                            <button onClick={() => setIsOpen((prev) => !prev)} className="text-light-gray flex items-center justify-between w-full">Products <div className="pt-1"><img className="w-4 h-5 ms-3" src ={dropbutton} alt=""/></div></button>
                            {isOpen && (
                                <div className="bg-yellow-gray border border-black absolute text-base z-10 list-none divide-y divide-black w-28"> 
                                    <li>
                                        <Link class="text-black block px-4 py-2" to="/Products/Crops">Crops</Link> 
                                    </li>
                                    <li>
                                        <Link class="text-black block px-4 py-2" to="/Products/Poultry">Poultry</Link>
                                    </li>
                                    
                                </div>
                            )}
                            </div>   
                               
                        </div>
                                            
                    <div className="lg:flex-2 pr-2">
                        <Link to="/">
                            <img className="h-24" src={logo} alt="logo"/>
                        </Link>
                    </div>

                    <div className="flex lg:flex-1 leading-9 lg:justify-end gap-x-8">
                        <Link to="/profile">
                            <img className="h-12" src={profile} alt="profile"/>
                        </Link>

                        <Link to="/ShoppingCart">
                            <img className="h-12" src={shoppingcart} alt="shoppingcart"/>
                        </Link>
                    </div>
                </nav>
            </header>
            <Outlet />   
        </>
    )
}
