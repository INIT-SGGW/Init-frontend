import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type LanguageContextType = {
    language: Language | undefined;
    setLanguage: (language: Language) => void;
};

export enum Language {
    PL = 'pl',
    EN = 'en',
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language | undefined>(undefined);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage as Language);
        } else {
            setLanguage(Language.PL);
        }
    }, []);

    const setLanguageHandler = (language: Language) => {
        setLanguage(language);
        localStorage.setItem('language', language);
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageHandler }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};