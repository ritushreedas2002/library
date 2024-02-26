import './Notification.css';
import { FiCheckCircle } from "react-icons/fi";
const Notification = ({ message, onClose }) => {
    return (
        <div className="fixed top-14 right-5 z-50 max-w-sm w-full h-14 bg-white shadow-lg rounded-lg p-4 border border-gray-200 overflow-hidden ">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className='flex'>

                    <FiCheckCircle className='text-3xl text-green-600 font-bold' />
                    <p className="text-sm font-medium text-gray-900 ml-7">
                        {message}
                    </p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500 ml-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/* Time Bar */}
            {/* <div className="w-full bg-green-200 h-1.5 mt-2">
                <div className="bg-green-500 h-1.5 w-full timebar-animation"></div>
            </div> */}
        </div>
    );
};

export default Notification;


