import React, {useState} from 'react';
import nextButton from "../images/back.png";
import prevButton from "../images/back.png";

export default function Header({slides}){
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if(current === 0){
            setCurrent(slides.length - 1);
        }else{
            setCurrent(current - 1);
        }
    }

    let nextSlide = () => {
        if(current === slides.length - 1){
            setCurrent(0);
        }else{
            setCurrent(current + 1);
        }
    }

    return(
        <div className="h-56 overflow-hidden relative md:h-96" >
            <div className={`flex transition ease-in-out duration-700`} style={{transform: `translateX(-${current * 100}%)`,}}>
                {slides.map((s) => {
                    return <img class="w-full -translate-x-1/8 -translate-y-1/3" src={s} alt="..." />
                })}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex px-10 text-3xl">
                <button onClick={previousSlide}>
                    <img alt="..." class="-rotate-180" src={prevButton} />
                </button>

                <button onClick={nextSlide}>
                    <img alt="..." src={nextButton} />
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {
                    return (
                        <div onClick={() => {setCurrent(i);}} key={"circle" + i} className={`rounded-full w-2 h-2 cursor-pointer  ${i === current ? "bg-white" : "bg-gray-500"}`}> </div>
                    );
                })}
            </div>
        </div>
    )
}