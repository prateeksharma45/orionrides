import './BookRideResponse.css'
import { motion } from 'framer-motion'

const Success = ({ isValid, response, isSuccessful }) => {
    return (
        <div className='response-card' style={{ textAlign: 'center', fontWeight: 600, fontSize: "1.2rem" }}>
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className={`response-icon ${isValid && isSuccessful ? 'success' : 'error'}`} >
                {
                    isValid && isSuccessful ? (
                        <i className="fa-solid fa-check"></i>
                    ) : (
                        <i className="fa-solid fa-exclamation"></i>
                    )
                }
            </motion.div>
            <p>{response}</p>
        </div>
    )
}

export default Success
