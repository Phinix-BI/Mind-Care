import React from 'react';

const DoctorsCard = () => {
  return (
    <div className="flex font-sans p-5 bg-white mb-10 rounded-lg mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
      <div className="flex-none w-48">
        <img src="images\man1.avif" alt="" className="inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
      </div>
      
      <form className="flex-auto p-4">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            Dr. Biswajit Dey
          </h1>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            Client Social Work/Therapist, MSW, LCSW-R
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
              New Client Available
            </button>
            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
              Online Therapy Avalable
            </button>
          </div>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
      </form>
      <div className="border-2 p-6 lg:flex">
        <p>New York, New York, USA</p>
        <p>+91 8240718898</p>
        <p>MindCare@gmail.com</p>

        <div className="flex">
          <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCard;
