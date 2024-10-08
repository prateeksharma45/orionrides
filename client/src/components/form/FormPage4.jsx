import './FormPage.css'

const Page1 = ({ formData, setFormData }) => {

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    return (
        <form>
            <label htmlFor="pick_up_date">
                Pick-Up Date
                <input type="date" name="pick_up_date" id="pick_up_date" onChange={inputHandler} value={formData.pick_up_date} required autoComplete='true' />
            </label>
            <label htmlFor="drop_off_date">
                Drop-Off Date
                <input type="date" name="drop_off_date" id="drop_off_date" onChange={inputHandler} value={formData.drop_off_date} required autoComplete='true' />
            </label>
        </form>
    )
}

export default Page1
