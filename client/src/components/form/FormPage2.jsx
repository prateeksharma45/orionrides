import './FormPage.css'

const Page2 = ({ formData, setFormData }) => {

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    return (
        <form>
            <label htmlFor="email">
                Email
                <input type="text" placeholder='Enter Email' id='email' name='email' onChange={inputHandler} value={formData.email} required autoComplete='true' />
            </label>
            <label htmlFor="phone_no">
                Phone Number
                <input type="text" placeholder='Enter Phone No' id='phone_no' name='phone_no' onChange={inputHandler} value={formData.phone_no} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page2
