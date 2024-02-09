import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
const Testing = () => {
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
        <div className='relative bg-gray-100 bg-opacity-100 shadow-lg p-6 mx-2 rounded-lg'>
            <h1 className='text-center'>Preview</h1>
        
            <div className="">
                <div className="overflow-hidden p-10">
                    <div className="">
                        <h1 className="font-medium text-3xl"> Lorem ipsum dolor sit amet ?</h1>
                        <div className="text-lg font-normal">
                            <p>a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                            <p>b. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
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

export default Testing