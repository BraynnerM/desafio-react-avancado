import styled from 'styled-components'
import { themes } from '../../contexts/theme-context';

export const Button = styled.button`  
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: solid 5px;
  border-radius: 20px;  
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;  
  bottom: 2vh;  
  position: static;
  z-index: 9999;  
  margin-top:15px;
  margin-bottom:44vh;
  font-size: 2.05em;
  max-width:280px;
  min-width:100px;
  width:25vw;
  max-height:90px;
  height:6.5vh; 
  box-shadow: 0 0 25px ${({ theme }) => theme.shadowColor};  
  @media (max-width: 1168px) {
    font-size: 2.1vh;
    min-width:0;
    padding: 0;
    border:solid 0.2em;    
  }
  @media (max-width: 768px) {
    font-size: 1.75vh;        
  }
  &:hover {    
    color: ${({ theme }) => (theme === themes.light ? '#cc0000' : '#3b4cca')};  
  }
`;
