import { useNavigate } from 'react-router-dom'
import './Categories.css'
import { useEffect, useState } from 'react'

const Categories = ({ data }) => {
    let navigate = useNavigate()
    const viewMoreBtnHandler = () => {
        navigate('/vehicles')
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 480);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let chipData = ["Sedans", "SUVs", "Supercars", "Coupe"]

    return (
        <section className="vehicle-categories">
            <div className="vehicle-categories-top">
                <h1>Explore Our Fleet</h1>
                <p>
                    {
                        isMobile ? "Select from our luxury cars, all maintained for a smooth ride." : "Choose from our extensive range of luxury vehicles, each meticulously maintained to ensure a smooth and stylish ride."
                    }
                </p>
                <div className="chips">
                    {
                        chipData.map((chip, index) => (
                            <div key={index} className="chip">
                                {chip}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="categories">
                {
                    data.map((individiulData, index) => (
                        <div key={index} className='category'>
                            <img src={individiulData.url} alt={individiulData.name} />
                        </div>
                    ))
                }
            </div>
            <div className="view-more-btn">
                <button onClick={viewMoreBtnHandler}>View More <i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </section>

    )
}

export default Categories
