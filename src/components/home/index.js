import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../load-more-button/load-more-button.js';

async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1282&offset=0')
  return await response.json()
};

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [quantidadeExibida, setQuantidadeExibida] = useState(10);
  const pokemonsExibidos = pokemons.slice(0, quantidadeExibida);
  const handleCarregarMais = () => {
    setQuantidadeExibida(quantidadeExibida + 10);
  };

  useEffect(() => {
    async function fetchData() {
      const pokemons = await getPokemons()
      setPokemons(pokemons.results)
    };

    fetchData()

  }, [])
  return (
    <Section>
      {pokemonsExibidos.map((pokemon, index) =>
        <div key={index}>
          <StyledLink to={`/details/${pokemon.name}`}>
            <Div>
              <H2>{pokemon.name}</H2>
              <Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} alt={pokemon.name} />            
            </Div>
          </StyledLink>
        </div>
      )}
      <Button onClick={handleCarregarMais}>Carregar Mais</Button>
    </Section>
  )
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50vw;          
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45vw;
  border: 4px solid;
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  gap: 15px;  
  margin-bottom:15px;  
  text-decoration: none;  
  &:hover {
    border-color: ${({ theme }) => theme.cardColor};;
    transition: border-color 0.3s ease-in-out;
  }
  &:hover H2{
    color: ${({ theme }) => theme.cardColor};;
    transition: color 0.3s ease-in-out;
  }
  @media (max-width: 480px) {
    width: 40vw;     
  }         
`;

const Img = styled.img`
  max-width: 30vw;
  margin-bottom: 10px;
`;

const H2 = styled.h2`  
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40vw;
  color: ${({ theme }) => theme.color}; 
  text-transform: capitalize;
  font-size: 30px;  
  @media (max-width: 1168px) {
    font-size: 24px;  
  } 
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  } 
  @media (max-width: 240px) {
    font-size: 6px;
  } 
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export { PokeList };

