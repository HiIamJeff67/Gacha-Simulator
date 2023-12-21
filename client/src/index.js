import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AuthContextProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </ BrowserRouter>
        </React.StrictMode>
    </AuthContextProvider>
);
