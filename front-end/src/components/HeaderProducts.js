import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import dropbutton from "../images/blackdropbutton.png";

export default function HeaderProducts({productType}){
    const[isOpen, setIsOpen] = useState(false)
    const[sort, setSort] = useState("Name")

    return(
        <>
            <header className="bg-yellow-gray">
                <div className="h-12 border-b border-black mx-auto flex max-w-8xl p-6 lg:px-14 items-center gap-1">
                    <Link to="/"> Home </Link>
                        /
                    <Link to=""> Products </Link>
                        /
                    <Link className="underline decoration-1" to=""> {productType} </Link>

                    <div className="flex lg:flex-1 mx-auto items-center leading-9 lg:justify-end gap-x-2">
                        Sort by:
                        <button onClick={() => setIsOpen((prev) => !prev)} class="bg-white border border-b border-black w-32 h-8"> 
                            <div class="inline-flex items-center">
                                {sort}

                                <img class="w-5 h-5" src={dropbutton} alt="..."/> 

                            </div>
                            
                            {isOpen && (
                                <div className="pb-4">
                                    <div className="bg-white border border-black absolute text-base z-10 list-none divide-y divide-black w-32"> 
                                        <li>
                                            <button class="text-black block pr-9 py-2 pl-2" onClick= {() => setSort("Name")}>Name</button>
                                        </li>
                                        <li>
                                            <button class="text-black block pr-9 py-2 pl-2" onClick= {() => setSort("Type")}>Type</button>
                                        </li>
                                        <li>
                                            <button class="text-black block pr-9 py-2 pl-2" onClick= {() => setSort("Price")}>Price</button>
                                        </li>
                                        <li>
                                            <button class="text-black block pr-3 py-2 pl-2" onClick= {() => setSort("Quantity")}>Quantity</button>
                                        </li>
                                    
                                    </div>
                                </div>
                                
                            )}
                        </button>
                    </div>
                </div>

                
            </header>
        </>
    )
}