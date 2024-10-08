import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { LoginModalProvider } from './contexts/LoginModalContext.jsx'
import { VehicleProvider } from './contexts/VehicleContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <VehicleProvider>
            <LoginModalProvider>
              <App />
            </LoginModalProvider>
          </VehicleProvider>
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
