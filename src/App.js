import React from "react"
import AppRoutes from './pages/routes'
import styled from 'styled-components';
import { ThemeProviderComponent } from './contexts/theme-context.js';
import cabecalhoImage from './assets/cabecalho.jpg';
import lateralImage from './assets/lateral.jpg';
import { ThemeTogglerButton } from './components/theme-toggler-button/theme-toggler-button.js';

const App = () => { 
  return (
    <ThemeProviderComponent>
      <PageContainer>        
        <ThemeTogglerButton />
        <Header />                        
        <LateralEsq />        
        <LateralDir />        
        <AppRoutes />
      </PageContainer>
    </ThemeProviderComponent>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color}; ;  
`;

const Header = styled.header`   
  background-image: url(${cabecalhoImage});
  background-repeat: no-repeat;
  background-size: contain;
  width: 500px;
  height: 291px;
  @media (max-width: 1168px) {
    width: 370px;
    height: 220px;  
  } 
  @media (max-width: 768px) {
    width: 240px;
    height: 170px; 
  }
  @media (max-width: 480px) {
    width: 125px;
    height: 90px; 
  }
  @media (max-width: 240px) {
    width: 105px;
    height: 80px; 
  }     
`;

const LateralEsq = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background-image: url(${lateralImage});
  background-repeat: no-repeat;
  background-size: cover;
  width: 25vw;
  height:100vh;
`;

const LateralDir = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: scaleX(-1);
  display: flex;
  background-image: url(${lateralImage});
  background-repeat: no-repeat;
  background-size: cover;
  width: 25vw;
  height: 100vh;
`;

export default App;
