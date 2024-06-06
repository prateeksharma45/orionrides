import './FormPage.css'

const Page1 = ({ formData, setFormData }) => {

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    return (
        <form>
            <label htmlFor="pickUpDate">
                Pick-Up Date
                <input type="date" name="pickUpDate" id="pickUpDate" onChange={inputHandler} value={formData.pickUpDate} required autoComplete='true' />
            </label>
            <label htmlFor="dropOffDate">
                Drop-Off Date
                <input type="date" name="dropOffDate" id="dropOffDate" onChange={inputHandler} value={formData.dropOffDate} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page1
