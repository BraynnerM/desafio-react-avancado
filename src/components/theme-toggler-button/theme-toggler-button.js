import React from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import styled from "styled-components";

export const ThemeTogglerButton = () => {    
    return (
        <ThemeContext.Consumer>
            {(context) => (
                <StyledButton theme={context.theme} onClick={context.toggleTheme}>Alternar Tema</StyledButton>
            )}       
        </ThemeContext.Consumer>
    )
};

const StyledButton = styled.button`  
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 20px;  
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;  
  top: 2vh;
  right: 2vh;
  position: fixed;
  z-index: 9999; 
  font-size: 1.3em;
  max-width:200px;
  min-width:100px;
  width:15vw;
  max-height:60px;
  height:5vh;
  @media (max-width: 1168px) {
    font-size: 1.4vh;    
    min-width:0;
    padding: 0;  
  } 
  @media (max-width: 768px) {
    font-size: 1.2vh;    
    min-width:80px;
    padding: 0;  
  } 
  &:hover {
    background-color: ${({ theme }) => (theme === themes.light ? '#2e2e2e' : '#ffffff')};
    color: ${({ theme }) => (theme === themes.light ? '#ffffff' : '#2e2e2e')};
  }
`;
