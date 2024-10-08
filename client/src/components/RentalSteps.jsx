import './RentalSteps.css'

const RentalSteps = () => {
    return (
        <section className="rental-steps-section">
            <div className="rental-steps-wrapper">
                <h2>How It Works?</h2>
                <h1>Step By Step Procedure To Rent Cars</h1>
                <div className="rental-steps">
                    <div className="step">
                        <div className="step-count">
                            1
                        </div>
                        <div className="step-icon">
                            <i className="fa-solid fa-car"></i>
                        </div>
                        <div className="step-body">
                            <h3>Choose a Car</h3>
                            <p>Browse our selection and choose the car that best fits your needs.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-count">
                            2
                        </div>
                        <div className="step-icon">
                            <i className="fa-solid fa-calendar-check"></i>
                        </div>
                        <div className="step-body">
                            <h3>Book the Car</h3>
                            <p>Complete the booking form with your details and reserve your car.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-count">
                            3
                        </div>
                        <div className="step-icon">
                            <i className="fa-solid fa-envelope-open"></i>
                        </div>
                        <div className="step-body">
                            <h3>Confirm via Email</h3>
                            <p>Confirm your booking by clicking the link in the email we send you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RentalSteps
