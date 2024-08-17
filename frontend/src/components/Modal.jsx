import React from 'react';

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-white">
            {children}
            <button 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg" 
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>
);

export default Modal;
