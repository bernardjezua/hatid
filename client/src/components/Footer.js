import React from 'react';
import logo from "../images/hatid_logo.png";

export default function Footer(){
    return(
        <>
        <footer class="flex flex-col items-center bg-neutral-warm text-center border-t border-neutral-200">
            <div class="mx-auto w-full max-w-screen-xl p-12 py-6 lg:py-8">
                <div class="md:flex md:justify-between items-center"> 
                <div class="mb-6 md:mb-0"> 
                    <img class="w-24 h-24 rounded-full shadow-md" src={logo} alt="logo"/>
                </div>
                    
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:pl-32 pt-8">
                        <p class="mb-6 text-sm font-semibold text-primary-900 uppercase hover:text-primary-600 cursor-pointer transition-colors">About Us</p>   
                        <p class="mb-6 text-sm font-semibold text-primary-900 uppercase hover:text-primary-600 cursor-pointer transition-colors">Follow Us</p> 
                        <p class="mb-6 text-sm font-semibold text-primary-900 uppercase hover:text-primary-600 cursor-pointer transition-colors">Resources</p> 
                    </div>
                </div>         
            </div>
        </footer>
        </>
    )
}