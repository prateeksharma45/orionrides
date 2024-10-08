import './FormPage.css'

const Page2 = ({ formData, setFormData }) => {

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    return (
        <form>
            <label htmlFor="address">
                Address
                <input type="text" placeholder='Enter Address' id='address' name='address' onChange={inputHandler} value={formData.address} required autoComplete='true' />
            </label>
            <label htmlFor="pincode">
                Pin Code
                <input type="text" placeholder='Enter Pin Code' id='pincode' name='pincode' onChange={inputHandler} value={formData.pincode} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page2
