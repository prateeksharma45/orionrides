import { useState } from 'react'
import './LoginSignupModal.css'
import { useAuth } from '../contexts/AuthContext';

const Login = ({ setCurrentState, setResponse, setIsSuccessful, setPreviousState }) => {
    let { storeTokenInLS } = useAuth()

    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ))
    }

    let handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formData)
            })
            let data = await res.json();
            setPreviousState('Login')
            setCurrentState("Response");
            setResponse(data.message);
            if (res.ok) {
                setIsSuccessful(true)
                storeTokenInLS(data.token)
            } else {
                setIsSuccessful(false)
            }
        } catch (error) {
            console.log("Error while login: ", error);
            setCurrentState("Response");
            setResponse('Something went wrong!');
            setIsSuccessful(false)
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                    <input type="text" placeholder='Enter Email' id='email' name='email' onChange={inputHandler} value={formData.email} required autoComplete='off' />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" placeholder='Enter Password' id='password' name='password' onChange={inputHandler} value={formData.password} required autoComplete='off' />
                </label>
                <button type='submit'>Login</button>
            </form>
            <p>No account yet?<br /><span onClick={() => setCurrentState("Sign Up")}>Click Here!</span></p>
        </>
    )
}

export default Login
