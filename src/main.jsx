import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ThemeProvider from './contexts/ThemeProvider.jsx'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <SettingsProvider>
                    <App />
                </SettingsProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)