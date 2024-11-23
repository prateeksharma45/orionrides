import { useEffect } from 'react';
import './NotFoundPage.css'
import { motion } from 'framer-motion'
import Footer from './Footer';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = 'Error 404 - Page Not Found!';
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className='not-found-page'>
                <h1>Error 404</h1>
                <p>Page Not Found!</p>
                <Link to='/'>Back to Home<i className="fa-solid fa-arrow-right"></i></Link>
            </motion.div>
            <Footer />
        </>
    )
}

export default NotFoundPage

