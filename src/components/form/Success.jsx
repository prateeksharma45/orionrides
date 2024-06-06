import './Success.css'

const Success = () => {
    return (
        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: "1.2rem" }}>
            <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            </div>
            Form Submitted Successfully, Check your email for a booking confirmation from us!
        </div>
    )
}

export default Success
