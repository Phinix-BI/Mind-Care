import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
const Preview = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };
    return (
        <div className='absolute left-40 bottom-40 bg-gray-100 shadow-lg p-6 mx-2 rounded-lg'>
            <h1 className='text-center'>Preview</h1>
        
            <div className="max-w-screen-md">
                <div className="overflow-hidden p-10">
                    <div className="">
                        <h1 className="font-medium text-3xl"> Lorem ipsum dolor sit amet ?</h1>
                        <div className="text-lg font-normal m-5 ">
                            <p>a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                            <p className="text-pink-700">b. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <p>c. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <p>d. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                        </div>
                    </div>
                </div>
                <i className="absolute left-0 top-1/2 p-2" onClick={prevSlide} ><GrPrevious /></i>
                <i className="absolute right-0 top-1/2 p-2" onClick={nextSlide} ><GrNext /></i>
            </div>
        </div>
    )
}

export default Preview