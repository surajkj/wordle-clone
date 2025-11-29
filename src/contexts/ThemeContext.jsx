import { createContext } from 'react';

// Provide a default value for the context
export const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {
        console.warn('ThemeProvider not found');
    }
});
