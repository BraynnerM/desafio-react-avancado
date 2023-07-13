import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../load-more-button/load-more-button.js';
import { getPokemon, getPokemons, getTypes } from "../../services/requestApi.js";

const PokeList = () => {
  const paginationLimit = 10;
  const nonTypeUrl = "https://pokeapi.co/api/v2/type/"

  const [pokemons, setPokemons] = useState([]);
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [filteredPaginationOffset, setFilteredPaginationOffset] = useState(10)
  const [types, setTypes] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState(nonTypeUrl);
  const [pokemonsTipados, setPokemonsTipados] = useState([]);
  const pokemonsTipadosExibidos = pokemonsTipados.slice(0, filteredPaginationOffset);

  const addPokemons = () => {
    if (tipoSelecionado === nonTypeUrl) {
      setFilteredPaginationOffset(10)
      setPaginationOffset(paginationOffset + paginationLimit)
    } else {
      setPaginationOffset(0);
      setFilteredPaginationOffset(filteredPaginationOffset + paginationLimit)
    }
  };

  useEffect(() => {    
    setPaginationOffset(0);
    setFilteredPaginationOffset(10)
  },[tipoSelecionado])

  useEffect(() => {
    const fetchData = async () => {
      if (tipoSelecionado === nonTypeUrl) {
        const data = await getPokemons(paginationLimit, paginationOffset);
        const pokemonsNames = data.map(pokemon => pokemon.name);
        const pokemonsPromises = pokemonsNames.map(async (pokemonName) => await getPokemon(pokemonName));
        const paginatedPokemons = await Promise.all(pokemonsPromises);

        const filteredPokemons = paginatedPokemons.filter(pokemon => {
          return !pokemons.some(existingPokemon => existingPokemon.name === pokemon.name);
        });

        const allPokemons = [...pokemons, ...filteredPokemons];
        setPokemons(allPokemons);
      } else {
        const data = await getTypes(tipoSelecionado);
        const typedPokemons = data.pokemon;
        const pokemonsNames = typedPokemons.map(pokemon => pokemon.pokemon.name);
        const pokemonsPromises = pokemonsNames.map(async (pokemonName) => await getPokemon(pokemonName));
        const paginatedPokemons = await Promise.all(pokemonsPromises);
        const allPokemons = [...paginatedPokemons];
        setPokemonsTipados(allPokemons);
      }
    };

    fetchData();
  }, [paginationOffset, tipoSelecionado]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTypes(tipoSelecionado);
      const types = data.results
      setTypes(types);
    };
    fetchData();
  }, []);

  return (
    <Section>
      <Types>
        <TitleType>Tipos:</TitleType>
        <TypeList>
          <RadioButton>
            <input
              type="radio"
              value={nonTypeUrl}
              checked={tipoSelecionado === nonTypeUrl}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            />
            Todos
          </RadioButton>
          {types.map((type, index) => (
            <RadioButton key={index}>
              <input
                type="radio"
                value={type.url}
                checked={tipoSelecionado === type.url}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              />
              {type.name}
            </RadioButton>
          ))}
        </TypeList>
      </Types>
      {tipoSelecionado === nonTypeUrl ? (pokemons.map((pokemon, index) => {
        return (
          <div key={index}>
            <StyledLink to={`/details/${pokemon.name}`}>
              <Div>
                <H2>{pokemon.name}</H2>
                <Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(pokemon.id)}.png`} alt={pokemon.name} />
              </Div>
            </StyledLink>
          </div>
        );
      })
      ) : (pokemonsTipadosExibidos.map((pokemon, index) => {
        return (
          <div key={index}>
            <StyledLink to={`/details/${pokemon.name}`}>
              <Div>
                <H2>{pokemon.name}</H2>
                <Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(pokemon.id)}.png`} alt={pokemon.name} />
              </Div>
            </StyledLink>
          </div>
        );
      })
      )
      }
      < Button onClick={addPokemons}>Carregar Mais</Button>
    </Section >
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
    input {
      width: 10px;
    }
  }
  @media (max-width: 480px) {
    font-size: 9px;
    input {
      width: 8px;
    }
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
