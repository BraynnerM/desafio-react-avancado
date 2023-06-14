import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { themes } from '../../contexts/theme-context';

const PokeDetails = () => {
    const [details, setDetails] = useState({});
    const [abilityDetails, setAbilityDetails] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();
            setDetails(data);
            async function getAbilityDetails(url) {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
            const abilitiesData = await Promise.all(
                data.abilities.map(async ability => {
                    const abilityDetails = await getAbilityDetails(ability.ability.url);
                    const englishDescription = abilityDetails.effect_entries.find(entry => entry.language.name === 'en');
                    return {
                        name: abilityDetails.name,
                        description: englishDescription ? englishDescription.effect : '',
                    };
                })
            );
            setAbilityDetails(abilitiesData);
        };
        fetchData();
    }, [id]);
    return (
        <Section>
            <Div>
                <Img src={details.sprites?.other?.['official-artwork']?.front_default} alt={`${details.name}`} />
                <H2>{details.name}</H2>
                <Ulm>
                    <li>
                        <P>Movimentos:</P>
                        <Ul>
                            {details.moves?.map((moves, index) => (
                                <li key={index}>
                                    {moves.move.name}
                                </li>
                            ))}
                        </Ul>
                    </li>
                    <li>
                        <P>Habilidades:</P>
                        <Ul>
                            {abilityDetails.map((ability, index) => (
                                <li key={index}>
                                    {ability.name}: {ability.description}
                                </li>
                            ))}
                        </Ul>
                    </li>
                    <li>
                        <P>Tipo:</P>
                        <Ul>
                            {details.types?.map((types, index) => (
                                <li key={index}>
                                    {types.type.name}
                                </li>
                            ))}
                        </Ul>
                    </li>
                </Ulm>
                <StyledLink to="/">Voltar para a Home</StyledLink>
            </Div>
        </Section>
    );
};

const Section = styled.section`  
    padding: 2vh;
`;

const Img = styled.img`
    max-width: 50%;
`;

const Ulm = styled.ul` 
    margin:0;   
    @media (max-width: 980px) {        
        padding-left: 2.5vh;
        font-size: 20px; 
    }
    @media (max-width: 800px) {        
        padding-left: 3vh;
        font-size: 18px; 
    }
    @media (max-width: 620px) {        
        padding-left: 3.5vh;
        font-size: 16px; 
    }
    @media (max-width: 400px) {
        padding-left: 4vh
        font-size: 10px;
    }
    @media (max-width: 320px) {
        padding-left: 3.5vh;
        font-size: 8px; 
    }
    @media (max-width: 240px) {
        padding-left: 3vh;
        font-size: 6px; 
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45vw;
    border: 0.5vh solid;  
    border-radius: 10px;
    gap: 15px;  
    margin-bottom:15px;
    box-shadow: 0 0 25px ${({ theme }) => theme.shadowColor};     
    @media (max-width: 480px) {
        width: 40vw;     
    }         
`;

const P = styled.p`
    @media (max-width: 1168px) {
        font-size: 22px;      
    } 
    @media (max-width: 980px) {    
        font-size: 20px; 
    }
    @media (max-width: 768px) {
        font-size: 19px;
    }
    @media (max-width: 700px) {
        font-size: 18px; 
    }
    @media (max-width: 620px) {
        font-size: 16px;   
    }
    @media (max-width: 560px) {
        font-size: 14px; 
    }
    @media (max-width: 480px) {
        font-size: 12px;
    } 
    @media (max-width: 400px) {
        font-size: 10px;
    }
    @media (max-width: 320px) {
        font-size: 8px; 
    }
    @media (max-width: 240px) {
        font-size: 6px;   
    }
`;

const H2 = styled.h2`
    margin:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40vw;
    color: ${({ theme }) => theme.color}; 
    text-transform: capitalize;
    font-size: 38px; 
    @media (max-width: 1168px) {
        font-size: 34px;  
    } 
    @media (max-width: 768px) {
        font-size: 30px;
    }
    @media (max-width: 480px) {
        font-size: 22px;
    } 
    @media (max-width: 240px) {
        font-size: 14px;
    } 
`;

const Ul = styled.ul`
    display: flex;
    flex-flow: column wrap;
    max-height: 50vh;
    padding-left: 3vh;       
    text-align: justify;
    padding-right:2vh;
    column-fill: auto;
    overflow: auto; 
    gap: 30px;       
    @media (max-width: 1100px){        
        font-size:12px;
    }
    @media (max-width: 980px) {        
        font-size: 10px;
        padding-left: 2vh; 
    }
    @media (max-width: 700px) {
        font-size: 9px;
        padding-left: 1.5vh;
        gap: 20px; 
    }
    @media (max-width: 620px) {
        font-size: 8px;
        padding-left: 1.3vh; 
    }
    @media (max-width: 560px) {
        font-size: 7px;
        padding-left: 1.1vh;
        gap:15px; 
    }
    @media (max-width: 480px) {
        font-size: 5px;
        max-height: 40vh;        
        padding-left: 0;
        gap: 10px;                 
    }
    @media (max-width: 400px) {
        font-size: 4px;  
    }
    @media (max-width: 320px) {
        font-size: 3px;    
    }
    @media (max-width: 240px) {
        font-size: 2px;     
    }  
`;

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;    
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border: solid 2px;
    border-radius: 20px;  
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;  
    bottom: 2vh;      
    position: static;
    z-index: 9999;  
    margin-top:1vh;
    margin-bottom:2vh;
    font-size: 25px;
    max-width:280px;
    min-width:100px
    max-height:90px;    
    width:25vw;    
    height:3.5vh;
    max-height: 60px;
    text-decoration: none;
    box-shadow: 0 0 25px ${({ theme }) => theme.shadowColor};   
    @media (max-width: 1168px) {
    font-size: 1.4vh;
    min-width:0;
    padding: 0;
    border:solid 0.2em;    
    }
    @media (max-width: 768px) {
    font-size: 1.2vh;
    min-width:0;    
    padding: 0;
    border:solid 0.2em;      
    }
    @media (max-width: 620px){
        font-size:0.9vh;
        max-height:1.3vh;
    }
    @media (max-width: 480px) {
        font-size: 5px; 
        max-height:1vh;
    }                     
    @media (max-width: 240px) {
        font-size: 3px; 
        max-height:0.6vh;        
    }
    &:hover {    
        color: ${({ theme }) => (theme === themes.light ? '#cc0000' : '#3b4cca')};  
      }
`;

export { PokeDetails };
