import { useEffect, useState } from 'react';
import './LoginSignupModal.css';
import { useAuth } from '../contexts/AuthContext';
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import avatar5 from '../assets/avatars/avatar5.png';
import avatar6 from '../assets/avatars/avatar6.png';

const Signup = ({ setCurrentState, setResponse, setIsSuccessful, setPreviousState }) => {
    let { storeTokenInLS } = useAuth();

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    });

    let [avatars] = useState([
        { id: 1, path: avatar1 },
        { id: 2, path: avatar2 },
        { id: 3, path: avatar3 },
        { id: 4, path: avatar4 },
        { id: 5, path: avatar5 },
        { id: 6, path: avatar6 },
    ]);
    let [selectedAvatar, setSelectedAvatar] = useState("");
    let [loading, setLoading] = useState(false);
    let [showPassword, setShowPassword] = useState(false);

    const handleSelection = (event) => {
        const selectedPath = event.target.value;
        setSelectedAvatar(selectedPath);
        setFormData((prev) => ({ ...prev, avatar: selectedPath }));
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
        if (avatars.length > 0) {
            const initialAvatar = avatars[0].path;
            setSelectedAvatar(initialAvatar);
            setFormData((prev) => ({ ...prev, avatar: initialAvatar }));
        }
    }, [avatars]);

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="avatar-wrapper">
                    <p>Choose an avatar</p>
                    <div className="avatars">
                        {avatars.map((avatar) => (
                            <div key={avatar.id} className="avatar-option">
                                <input
                                    type="radio"
                                    id={`avatar${avatar.id}`}
                                    name="avatar"
                                    value={avatar.path}
                                    onChange={handleSelection}
                                    checked={selectedAvatar === avatar.path}
                                />
                                <label htmlFor={`avatar${avatar.id}`}>
                                    <img src={avatar.path} alt={`Avatar ${avatar.id}`} width="100" />
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
