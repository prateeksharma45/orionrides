import './BookRide.css'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import FormPage1 from './form/FormPage1'
import FormPage2 from './form/FormPage2'
import FormPage3 from './form/FormPage3'
import FormPage4 from './form/FormPage4'
import Success from './form/Success'
import Validation from './form/Validation'

const BookRide = ({ closeBookRideModal }) => {
    let [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        phno: "",
        address: "",
        pincode: "",
        pickUpDate: "",
        dropOffDate: ""
    })

    let [pageNo, setPageNo] = useState(0)

    const formDisplay = () => {
        if (pageNo == 0) {
            return <FormPage1 formData={formData} setFormData={setFormData} />
        } else if (pageNo == 1) {
            return <FormPage2 formData={formData} setFormData={setFormData} />
        } else if (pageNo == 2) {
            return <FormPage3 formData={formData} setFormData={setFormData} />
        } else if (pageNo == 3) {
            return <FormPage4 formData={formData} setFormData={setFormData} />
        } else if (pageNo == 4) {
            if (formData.name == "" || formData.age == "" || formData.email == "" || formData.phno == "" || formData.address == "" || formData.pincode == "" || formData.pickUpDate == "" || formData.dropOffDate == "") {
                return <Validation />
            } else {
                return <Success />
            }
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    })

    let formBGRef = useRef(null)

    const formBGClickHandler = (e) => {
        if (formBGRef.current == e.target) {
            closeBookRideModal()
        }
    }

    const nextBtnHandler = () => {
        pageNo < 4 && (setPageNo((currPage) => currPage + 1))
        if (pageNo == 4) {
            closeBookRideModal()
        }
    }

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
                    <span style={{ backgroundColor: pageNo >= 0 ? "orange" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 1 ? "orange" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 2 ? "orange" : "#e4e4e4" }}></span>
                    <span style={{ backgroundColor: pageNo >= 3 ? "orange" : "#e4e4e4" }}></span>
                </div>
                {formDisplay()}
                <div className="btns">
                    <button
                        onClick={() => (
                            setPageNo((currPage) => currPage - 1)
                        )}
                        style={{ display: pageNo == 0 || pageNo == 4 && !(formData.name == "" || formData.age == "" || formData.email == "" || formData.phno == "" || formData.address == "" || formData.pincode == "" || formData.pickUpDate == "" || formData.dropOffDate == "") ? "none" : "block" }}
                        className='previous-btn'
                    >Back</button>
                    <button
                        onClick={nextBtnHandler}
                        className='next-btn'
                    >
                        {
                            pageNo == 3 ? "Submit" : pageNo >= 4 ? "Done" : "Next"
                        }
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default BookRide
