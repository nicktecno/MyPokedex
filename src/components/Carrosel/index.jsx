/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { getAllPokemon, getPokemon } from '../../services/pokemon';
import Card from '../CardCarrossel';
import backIcon from '../../assets/images/back.svg';
import nextIcon from '../../assets/images/next.svg';

import './styles.css';

const Carrossel = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=5';

  const loadingPokemon = async (data) => {
    const pokemonPromiseData = await Promise.all(
      data.map(async (pokemon) => {
        const pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );
    setPokemonData(pokemonPromiseData);
  };

  const next = async () => {
    setLoading(true);
    const data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getAllPokemon(initialUrl);
      console.log(response);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  console.log;

  return (
    <div className="carrosselBox">
      <div className="packDeCardsCarrossel">
        <div className="btnL">
          <button type="button" onClick={prev}>
            <img src={backIcon} alt="back" />
          </button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="containerCarrossel">
              {pokemonData.map((pokemon, i) => (
                <Card key={i} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
        <div className="btnR">
          <button type="button" onClick={next}>
            <img src={nextIcon} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrossel;
