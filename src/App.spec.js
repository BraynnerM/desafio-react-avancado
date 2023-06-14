import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./assets/cabecalho.jpg', () => 'cabecalho.jpg');
jest.mock('./assets/lateral.jpg', () => 'lateral.jpg');

describe('App component', () => {
  test('renders without errors', () => {
    const { getByText } = render(<App />);    
    
    const typeElement = getByText('Tipo');
    expect(typeElement).toBeInTheDocument();    
    
    const loadMoreElement = getByText('Carregar');
    expect(loadMoreElement).toBeInTheDocument();  
    
  });
});

