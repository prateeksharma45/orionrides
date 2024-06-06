import { useEffect } from 'react';
import './About.css'
import { motion } from 'framer-motion'

const About = () => {

    let teamMembersData = [
        {
            name: "Raghav Singh",
            url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: "Business Owner"
        },
        {
            name: "Naman Verma",
            url: "https://images.pexels.com/photos/2770596/pexels-photo-2770596.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: "Marketing Manager"
        },
        {
            name: "Aarav Gupta",
            url: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: "Accountant"
        },
        {
            name: "Ishaan Ahuja",
            url: "https://images.pexels.com/photos/3139606/pexels-photo-3139606.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: "Sales Representative"
        },
        {
            name: "Maanas Jha",
            url: "https://images.pexels.com/photos/3141289/pexels-photo-3141289.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: " Marketing Manager"
        },
        {
            name: "Karan Anand",
            url: "https://images.pexels.com/photos/1896081/pexels-photo-1896081.jpeg?auto=compress&cs=tinysrgb&w=350",
            role: " Photographer"
        }
    ]

    useEffect(() => {
        document.title = 'Discover Orion Rides - Your Trusted Car Rental Partner';
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
            className='about-page'>
            <div className="about-section-img">
                <img src="https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg" alt="About Section Image" />
            </div>
            <div className="about-text">
                <h1>About Us</h1>
                <p>At Orion Rides, we offer a premium car rental experience with a diverse fleet of top-notch vehicles, ensuring your journey is comfortable, stylish, and seamless. Trust us to elevate your travels.</p>
            </div>
            <div className="team-section">
                <h1>Meet Our Team</h1>
                <div className="team-members">
                    {
                        teamMembersData.map((teamMember, index) => (
                            <div key={index} className="team-member-details">
                                <img src={teamMember.url} alt={teamMember.name} />
                                <h3>{teamMember.name}</h3>
                                <h4>{teamMember.role}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default About

