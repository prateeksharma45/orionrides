import { createContext, useState } from 'react'

export const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
    let [isLoginSignupModal, setIsLoginSignupModal] = useState(false)

    const handleLoginSignupModal = () => {
        setIsLoginSignupModal(!isLoginSignupModal)
    }

    return (
        <LoginModalContext.Provider value={{ isLoginSignupModal, handleLoginSignupModal }}>
            {children}
        </LoginModalContext.Provider>
    );
}
