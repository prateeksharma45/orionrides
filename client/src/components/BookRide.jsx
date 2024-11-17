import './BookRide.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FormPage1 from './form/FormPage1';
import FormPage2 from './form/FormPage2';
import FormPage3 from './form/FormPage3';
import FormPage4 from './form/FormPage4';
import BookRideResponse from './form/BookRideResponse';
import { useAuth } from '../contexts/AuthContext';

const BookRide = ({ closeBookRideModal, carId, getVehicleDets }) => {
    let [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        phone_no: "",
        address: "",
        pincode: "",
        pick_up_date: "",
        drop_off_date: ""
    });

    let { authToken, userAuthentication } = useAuth();

    let [response, setResponse] = useState('');
    let [isSuccessful, setIsSuccessful] = useState(true);
    let [pageNo, setPageNo] = useState(0);

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const pincodeRegex = /^[0-9]{6}$/;

        return (
            formData.name.trim().length > 0 &&
            formData.age && formData.age > 0 && formData.age < 120 &&
            formData.email.trim().length > 0 && emailRegex.test(formData.email) &&
            formData.phone_no.trim().length > 0 && phoneRegex.test(formData.phone_no) &&
            formData.address.trim().length > 0 &&
            formData.pincode.trim().length > 0 && pincodeRegex.test(formData.pincode) &&
            formData.pick_up_date.trim().length > 0 &&
            formData.drop_off_date.trim().length > 0 &&
            new Date(formData.pick_up_date) <= new Date(formData.drop_off_date) &&
            new Date(formData.pick_up_date) >= new Date()
        );
    };


    const formDisplay = () => {
        if (pageNo === 0) {
            return <FormPage1 formData={formData} setFormData={setFormData} />;
        } else if (pageNo === 1) {
            return <FormPage2 formData={formData} setFormData={setFormData} />;
        } else if (pageNo === 2) {
            return <FormPage3 formData={formData} setFormData={setFormData} />;
        } else if (pageNo === 3) {
            return <FormPage4 formData={formData} setFormData={setFormData} />;
        } else if (pageNo === 4) {
            return (
                <BookRideResponse
                    isValid={isFormValid()}
                    response={response}
                    isSuccessful={isSuccessful}
                />
            );
        }
    };

    const BookRideFunction = async () => {
        if (isFormValid()) {
            try {
                let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/book-ride/${carId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    },
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                let data = await res.json();
                setResponse(data.message);
                setIsSuccessful(res.ok);
                userAuthentication()
                getVehicleDets()
            } catch (error) {
                console.log("Error renting car: ", error);
                setResponse('Error renting car!');
                setIsSuccessful(false);
            }
            setPageNo(4);
        } else {
            setResponse('Please ensure all fields are filled out and correctly formatted.');
            setIsSuccessful(false);
        }
    }

    useEffect(() => {
        if (pageNo === 4) {
            BookRideFunction()
        }
    }, [pageNo])

    const nextBtnHandler = async () => {
        if (pageNo < 4) {
            setPageNo((currPage) => currPage + 1);
        } else if (pageNo === 4) {
            closeBookRideModal();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    let formBGRef = useRef(null);

    const formBGClickHandler = (e) => {
        if (formBGRef.current === e.target) {
            closeBookRideModal();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className='form-wrapper' ref={formBGRef} onClick={formBGClickHandler}>
            <motion.div
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "backInOut"
                }}
                className="form-container">
                <div className="close" onClick={closeBookRideModal}>
                    <div className="close-icon"></div>
                </div>
                <h1>Book Ride</h1>
                <div className="progress-bar">
                    <span style={{ backgroundColor: pageNo >= 0 ? "black" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 1 ? "black" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 2 ? "black" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 3 ? "black" : "#e4e4e4" }}></span>
                </div>
                {formDisplay()}
                <div className="btns">
                    <button
                        onClick={() => setPageNo((currPage) => currPage - 1)}
                        style={{ display: pageNo === 0 || (pageNo === 4 && isFormValid()) ? "none" : "block" }}
                        className='previous-btn'
                    >Back</button>
                    <button
                        onClick={nextBtnHandler}
                        className='next-btn'
                    >
                        {pageNo === 3 ? "Submit" : pageNo >= 4 ? "Done" : "Next"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BookRide;
