import React from 'react';
import logo from "../images/hatid_logo.png";

export default function Footer(){
    return(
        <>
        <footer class="flex flex-col items-center bg-yellow-gray text-center text-black">
            <div class="mx-auto w-full max-w-screen-xl p-24 py-6 lg:py-8">
                <div class="md:flex md:justify-between"> 
                <div class="mb-6 md:mb-0"> 
                    <img class="w-24 h-24 rounded-full" src={logo} alt="logo"/>
                </div>
                    
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 pr-96 pt-12">
                        <p class="mb-6 text-sm font-semibold text-black uppercase dark:text-white">About Us</p>   
                        <p class="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Follow Us</p> 
                        <p class="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Resources</p> 
                    </div>
                </div>         
            </div>
        </footer>
        </>
    )
}