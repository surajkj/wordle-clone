import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('wordle-dark-mode');
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        console.log('Theme effect running, isDark:', isDark);
        localStorage.setItem('wordle-dark-mode', JSON.stringify(isDark));

        const html = document.documentElement;

        if (isDark) {
            html.classList.add('dark');
            console.log('Added dark class');
        } else {
            html.classList.remove('dark');
            console.log('Removed dark class');
        }

        // Debug: log current classes
        console.log('HTML classes:', html.className);
    }, [isDark]);

    const toggleTheme = () => {
        console.log('Toggling theme from:', isDark);
        setIsDark(prev => !prev);
    };

    const value = {
        isDark,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
