import './LoginSignupModal.css'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Login from './Login'
import Signup from './Signup'
import LoginSignupResponse from './LoginSignupResponse'

const LoginSignupModal = ({ handleLoginSignupModal }) => {
    let [currentState, setCurrentState] = useState("Sign Up")
    let [previousState, setPreviousState] = useState("Sign Up")
    let [response, setResponse] = useState('');
    let [isSuccessful, setIsSuccessful] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    })

    let formBGRef = useRef(null)

    const formBGClickHandler = (e) => {
        if (formBGRef.current == e.target) {
            handleLoginSignupModal()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className='form-wrapper' ref={formBGRef} onClick={formBGClickHandler}>
            <motion.div
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "backInOut"
                }}
                className="form-container">
                <div className="close" onClick={handleLoginSignupModal}>
                    <div className="close-icon"></div>
                </div>
                {currentState === "Sign Up" ? (
                    <Signup setCurrentState={setCurrentState} setResponse={setResponse} setIsSuccessful={setIsSuccessful} setPreviousState={setPreviousState} />
                ) : currentState === "Login" ? (
                    <Login setCurrentState={setCurrentState} setResponse={setResponse} setIsSuccessful={setIsSuccessful} setPreviousState={setPreviousState} />
                ) : currentState === "Response" ? (
                    <LoginSignupResponse response={response} isSuccessful={isSuccessful} setCurrentState={setCurrentState} handleLoginSignupModal={handleLoginSignupModal} previousState={previousState} />
                ) : null
                }
            </motion.div>
        </motion.div>
    )
}

export default LoginSignupModal
