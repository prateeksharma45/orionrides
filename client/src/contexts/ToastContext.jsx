import React, { createContext, useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const showToast = (message, type) => {
        setToast({ message, type, visible: true });

        setTimeout(() => {
            setToast({ message: '', type: '', visible: false });
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <AnimatePresence>
                {toast.visible && <Toast message={toast.message} type={toast.type} />}
            </AnimatePresence>
        </ToastContext.Provider>
    );
};
