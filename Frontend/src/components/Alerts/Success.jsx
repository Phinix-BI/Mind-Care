import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Success = () => {
    const notify = () => toast("Success");

    return (
        <div>
            <button onClick={notify}>Success</button>
            <ToastContainer />
        </div>
    );
}