import { useNavigate } from 'react-router-dom'
import './HeroSection.css'

const HeroSection = () => {
    let navigate = useNavigate()
    const getStartedBtnHandler = () => {
        navigate('/vehicles')
    }

    return (
        <section className="hero-section">
            <div className="hero-section-container">
                <img src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg" alt="Rolls Royce" />
                <div className="badge">
                    Trusted by 1,000+ happy riders!🌟
                </div>
                <h1>Drive Your Dreams with Orion Rides</h1>
                <p>Experience luxury, comfort, and convenience with our premium car rental services. Discover the perfect ride for every journey.</p>
                <button onClick={getStartedBtnHandler}>Get Started</button>
            </div>
        </section>
    )
}

export default HeroSection
