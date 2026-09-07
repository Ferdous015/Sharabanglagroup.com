import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/site';

export type Language = 'en' | 'bn' | 'zh';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('sharabangla_lang') as Language | null;
    return (saved === 'bn' || saved === 'en' || saved === 'zh') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('sharabangla_lang', lang);
    if (lang === 'bn') {
      document.documentElement.classList.add('font-bangla');
      document.documentElement.classList.remove('font-chinese');
      document.documentElement.lang = 'bn';
    } else if (lang === 'zh') {
      document.documentElement.classList.add('font-chinese');
      document.documentElement.classList.remove('font-bangla');
      document.documentElement.lang = 'zh-CN';
    } else {
      document.documentElement.classList.remove('font-bangla');
      document.documentElement.classList.remove('font-chinese');
      document.documentElement.lang = 'en';
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState(prev => {
      if (prev === 'en') return 'zh';
      if (prev === 'zh') return 'bn';
      return 'en';
    });
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let obj: any = translations[lang];
    
    for (const k of keys) {
      if (obj && obj[k] !== undefined) {
        obj = obj[k];
      } else {
        // Fallback to English if translation is missing in chosen language
        let fallbackObj: any = translations['en'];
        for (const fk of keys) {
          if (fallbackObj && fallbackObj[fk] !== undefined) {
            fallbackObj = fallbackObj[fk];
          } else {
            return key;
          }
        }
        return typeof fallbackObj === 'string' ? fallbackObj : key;
      }
    }
    return typeof obj === 'string' ? obj : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
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
