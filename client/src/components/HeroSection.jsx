import { useNavigate } from 'react-router-dom'
import BG from '../assets/Hero-BG.jpeg'
import BGVidMP4 from '../assets/BG.mp4'
import { motion } from 'framer-motion'
import './HeroSection.css'
import { useEffect, useRef, useState } from 'react'

const HeroSection = () => {
    let navigate = useNavigate()
    const getStartedBtnHandler = () => {
        navigate('/vehicles')
    }

    let BGVideo = useRef(null)

    useEffect(() => {
        if (BGVideo.current) {
            const handleLoad = () => {
                BGVideo.current.classList.add("loaded");
            };

            const checkIfLoaded = () => {
                if (BGVideo.current.readyState >= 3) { // readyState 3 means the video has enough data to play
                    BGVideo.current.classList.add("loaded");
                } else {
                    BGVideo.current.addEventListener("loadeddata", handleLoad);
                }
            };

            checkIfLoaded();

            return () => {
                if (BGVideo.current) {
                    BGVideo.current.removeEventListener("loadeddata", handleLoad);
                }
            };
        }
    }, []);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 481);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 481);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-section-container">
                <div className="hero-section-background" style={{ backgroundImage: `url(${BG})` }}>
                    {/* <img src={BG} alt="Rolls Royce" /> */}
                    <video autoPlay loop muted playsInline controls={false} ref={BGVideo}>
                        {/* <source src={BGVidWEBM} type="video/webm" /> */}
                        <source src={BGVidMP4} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        delay: 0.2,
                        duration: 1,
                        ease: "anticipate"
                    }}
                    className="badge">
                    Trusted by 1,000+ happy riders!🌟
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        delay: 0.4,
                        duration: 1,
                        ease: "anticipate"
                    }}
                >Drive Your Dreams with {isLargeScreen && <br />} Orion Rides</motion.h1>
                <motion.p
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        delay: 0.6,
                        duration: 1,
                        ease: "anticipate"
                    }}
                >Experience luxury, comfort, and convenience with our premium car rental services. Discover the perfect ride for every journey.</motion.p>
                <motion.button
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        delay: 0.8,
                        duration: 1,
                        ease: "anticipate"
                    }}
                    onClick={getStartedBtnHandler}>Get Started</motion.button>
            </div>
        </section>
    )
}

export default HeroSection
