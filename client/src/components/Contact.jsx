import { useEffect } from 'react';
import './Contact.css'
import { motion } from 'framer-motion';

const Contact = () => {
    const handleContactForm = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        document.title = 'Get in Touch - Reach Out to Orion Rides';
    }, []);

    return (
        <motion.div
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "2rem", opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className='contact-page'>
            <div className="contact-wrapper">
                <div className="contact-left">
                    <div className="contact-badge">
                        Let's Have a Chat
                    </div>
                    <h1>Contact Us</h1>
                    <p>Questions about our services or feedback to share? Don't hesitate to reach out to us. Our team is ready and eager to assist you. Send us a message anytime!</p>
                </div>
                <div className="contact-right">
                    <form onSubmit={handleContactForm}>
                        <label htmlFor="contact-name">
                            Name
                            <input type="text" name="contact-name" id="contact-name" placeholder='Enter Name' />
                        </label>
                        <label htmlFor="contact-email">
                            Email
                            <input type="text" name="contact-email" id="contact-email" placeholder='Enter Email' />
                        </label>
                        <label htmlFor="contact-phno">
                            Phone Number
                            <input type="text" name="contact-phno" id="contact-phno" placeholder='Enter Phone Number' />
                        </label>
                        <label htmlFor="contact-message">
                            Message
                            <textarea name="contact-message" id="contact-message" placeholder='Enter Message' rows="5"></textarea>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Contact
