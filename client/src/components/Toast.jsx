import React from 'react';
import { motion } from 'framer-motion';
import './Toast.css';

const Toast = ({ message, type }) => {
    return (
        <motion.div
            className={`toast ${type}`}
            initial={{ x: "2rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "2rem", opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "backInOut"
            }}
        >
            <div className="toast-icon">
                {
                    type == "success" ? (
                        <i className="fa-solid fa-check"></i>
                    ) : (
                        <i className="fa-solid fa-exclamation"></i>
                    )
                }
            </div>
            {message}
        </motion.div>
    );
};

export default Toast;
