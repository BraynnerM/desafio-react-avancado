import React from "react";
import { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components';

export const themes = {
    light: {
      background: '#eeeeee',
      color: '#000000',
      borderColor: '#000000',
      cardColor: '#cc0000',
      shadowColor:'rgba(0, 0, 0, 0.9)'
    },
    dark: {
      background: '#2e2e2e',
      color: '#ffffff',
      borderColor: '#ffffff',
      cardColor: '#3b4cca',
      shadowColor:'rgba(255, 255, 255, 0.9)'
    }
  };
  
export const ThemeContext = createContext();

export const ThemeProviderComponent = (props) => {
    const [ theme, setTheme ] = useState(themes.light)
    
    const toggleTheme = () => {
      setTheme(theme === themes.light ? themes.dark : themes.light);
    };
    
    return (
        <ThemeContext.Provider value={{themes: theme, toggleTheme}}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    )
};
