import './LoginSignupResponse.css'
import { motion } from 'framer-motion'

const LoginSignupResponse = ({ response, isSuccessful, setCurrentState, handleLoginSignupModal, previousState }) => {

    const handleResponseBtn = () => {
        if (isSuccessful) {
            handleLoginSignupModal()
        } else {
            setCurrentState(previousState)
        }
    }

    return (
        <div className='response-card'>
            <h1>
                {
                    previousState
                }
            </h1>
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className={`response-icon ${isSuccessful ? 'success' : 'error'}`} >
                {
                    isSuccessful ? (
                        <i className="fa-solid fa-check"></i>
                    ) : (
                        <i className="fa-solid fa-exclamation"></i>
                    )
                }
            </motion.div>
            <p>{response}</p>
            <button onClick={handleResponseBtn}>
                {
                    isSuccessful ? "Done" : `${previousState} Again!`
                }
            </button>
        </div>
    )
}

export default LoginSignupResponse
