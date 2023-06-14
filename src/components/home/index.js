import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../load-more-button/load-more-button.js';

const getPokemons = async () => {  
  const totalCount = 1010;
  const getOnePokemon = async (index) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      return await response.json()
  };

  let pokemons = [];
  for (let i = 1; i <= totalCount; i++) {    
      const pokemon = await getOnePokemon(i);
      pokemons = [...pokemons, pokemon];    
  }
  return pokemons;
};

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);   
  const [types, setTypes] = useState([]);  
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");  
  const [quantidadeExibida, setQuantidadeExibida] = useState(10);  
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);  
  const pokemonsExibidos = pokemonsFiltrados.slice(0, quantidadeExibida);  
  const handleCarregarMais = () => {
      setQuantidadeExibida(quantidadeExibida + 10);
  };
 
  useEffect(() => {
      async function fetchData() {
          const pokemons = await getPokemons()
          setPokemons(pokemons)
          setPokemonsFiltrados(pokemons)
      };
      fetchData()
  }, [])

  useEffect(() => {
    const getTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      const types = data.results.map(type => type.name);
      const filteredTypes = types.filter(type => type !== "unknown" && type !== "shadow");
      setTypes(filteredTypes);
    };
    getTypes();
  }, []);

  const filterPokemonsByType = () => {
    if (tipoSelecionado === 'Todos') {
      setPokemonsFiltrados(pokemons);
    } else {
      const filteredPokemons = pokemons.filter(pokemon => {
        return pokemon.types.some(typeObj => typeObj.type.name === tipoSelecionado);
      });
      setPokemonsFiltrados(filteredPokemons);      
    }
  };

  useEffect(() => {   
    filterPokemonsByType();
  }, [tipoSelecionado, pokemons]);

  return (
    <Section>
      <Types>
        <TitleType>Tipos:</TitleType>
        <TypeList>
            <RadioButton>
              <input
                type="radio"
                value="Todos"
                checked={tipoSelecionado === "Todos"}
                onChange={(e) => setTipoSelecionado(e.target.value)}              
              />
              Todos              
            </RadioButton>
          {types.map((type, index) => (
            <RadioButton key={index}>
              <input
                type="radio"
                value={type}
                checked={tipoSelecionado === type}
                onChange={(e) => setTipoSelecionado(e.target.value)}              
              />
              {type}
            </RadioButton>
          ))}
        </TypeList>
      </Types>
      {pokemonsExibidos.map((pokemon, index) =>
        <div key={index}>
          <StyledLink to={`/details/${pokemon.name}`}>
            <Div>
              <H2>{pokemon.name}</H2>
              <Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
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

const Types = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  border: 4px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  gap: 10px;
  margin-bottom: 20px;  
  width: 15vw;
  height: auto;
  top: 10vh;
  right: 2vh;
  position: fixed;
  z-index: 9999;  
  box-shadow: 0 0 25px ${({ theme }) => theme.shadowColor};
  @media (max-width: 480px) {
    width: 16vw;     
  } 
`;

const TitleType = styled.h2`
  display: flex;
  justify-content: center;
  width: 15vw;
  margin-top: 0;
  margin-bottom: 0;
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
`
const TypeList = styled.div`
  display: flex;   
  flex-direction: column;  
  align-content: center;  
  flex-wrap: wrap;
  height: auto;
`

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  text-transform: capitalize;
  input[type='radio'] {
    margin-right: 5px;
  }
  @media (max-width: 1168px) {
    font-size: 14px;  
  } 
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 9px;
  } 
  @media (max-width: 240px) {
    font-size: 5px;
  } 
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
  box-shadow: 0 0 25px ${({ theme }) => theme.shadowColor}; 
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
