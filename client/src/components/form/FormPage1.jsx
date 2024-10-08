import './FormPage.css'

const Page1 = ({ formData, setFormData }) => {

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    return (
        <form>
            <label htmlFor="name">
                Name
                <input type="text" placeholder='Enter Name' id='name' name='name' onChange={inputHandler} value={formData.name} required autoComplete='true' />
            </label>
            <label htmlFor="age">
                Age
                <input type="number" placeholder='Enter Age' id='age' name='age' onChange={inputHandler} value={formData.age} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page1
