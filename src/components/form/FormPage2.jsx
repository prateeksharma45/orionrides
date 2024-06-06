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
            <label htmlFor="phno">
                Phone Number
                <input type="text" placeholder='Enter Phone No' id='phno' name='phno' onChange={inputHandler} value={formData.phno} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page2
