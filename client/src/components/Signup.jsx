import { useEffect, useState } from 'react';
import './LoginSignupModal.css';
import { useAuth } from '../contexts/AuthContext';

const Signup = ({ setCurrentState, setResponse, setIsSuccessful, setPreviousState }) => {
    let { storeTokenInLS } = useAuth();

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    });

    let [avatars, setAvatars] = useState([]);
    let [selectedAvatar, setSelectedAvatar] = useState("");
    let [loading, setLoading] = useState(false);
    let [showPassword, setShowPassword] = useState(false);

    const handleSelection = (event) => {
        setSelectedAvatar(event.target.value);
        setFormData((prev) => ({ ...prev, avatar: event.target.value }));
    };

    let inputHandler = (event) => {
        setFormData((prev) => (
            { ...prev, [event.target.name]: event.target.value }
        ));
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formData)
            });
            let data = await res.json();
            setPreviousState('Sign Up');
            setCurrentState("Response");
            setResponse(data.message);
            if (res.ok) {
                setIsSuccessful(true);
                storeTokenInLS(data.token);
            } else {
                setIsSuccessful(false);
            }
        } catch (error) {
            console.log("Error creating user: ", error);
            setCurrentState("Response");
            setResponse('Something went wrong!');
            setIsSuccessful(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/avatars`)
            .then(response => response.json())
            .then(data => {
                setAvatars(data);
                if (data.length > 0) {
                    setSelectedAvatar(data[0]);
                    setFormData((prev) => ({ ...prev, avatar: data[0] }));
                }
            })
            .catch(error => console.error('Error fetching avatars: ', error));
    }, []);

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="avatar-wrapper">
                    <p>Choose an avatar</p>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div key={index} className="avatar-option">
                                <input
                                    type="radio"
                                    id={`avatar${index + 1}`}
                                    name="avatar"
                                    value={avatar}
                                    onChange={handleSelection}
                                    checked={selectedAvatar === avatar}
                                />
                                <label htmlFor={`avatar${index + 1}`}>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${avatar}`} alt={`Avatar ${index + 1}`} width="100" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <label htmlFor="name">
                    Name
                    <input type="text" placeholder='Enter Name' id='name' name='name' onChange={inputHandler} value={formData.name} required autoComplete='off' />
                </label>
                <label htmlFor="email">
                    Email
                    <input type="text" placeholder='Enter Email' id='email' name='email' onChange={inputHandler} value={formData.email} required autoComplete='off' />
                </label>
                <label htmlFor="password">
                    Password
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            id="password"
                            name="password"
                            onChange={inputHandler}
                            value={formData.password}
                            required
                            autoComplete="off"
                        />
                        <i
                            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                            onClick={() => setShowPassword(prev => !prev)}
                        ></i>
                    </div>
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? <span className="loader"></span> : 'Sign Up'}
                </button>
            </form>
            <p>Already have an account?<br /><span onClick={() => setCurrentState("Login")}>Login Here!</span></p>
        </>
    );
};

export default Signup;
