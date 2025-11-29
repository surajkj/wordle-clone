import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [wordLength, setWordLength] = useState(() => {
        const saved = localStorage.getItem('wordle-word-length');
        return saved ? parseInt(saved) : 5;
    });

    useEffect(() => {
        localStorage.setItem('wordle-word-length', wordLength.toString());
    }, [wordLength]);

    const value = {
        wordLength,
        setWordLength,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
