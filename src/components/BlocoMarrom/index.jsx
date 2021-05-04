/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import backIcon from '../../assets/images/back.svg';
import nextIcon from '../../assets/images/next.svg';

import {
  getAllPokemon,
  getPokemon,
  getPokemonByTypeName,
} from '../../services/pokemon';

import Card from '../Card';

import getPokemonTypes from '../../helpers/pokemonTypes';
import Select from '../Select';

import './styles.css';

const BlocoMarrom = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  const [pokemonDataFilter, setPokemonDataFilter] = useState([]);
  const [loadingFilter, setLoadingFilter] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const [total, setTotal] = useState(0);
  const [selectedPokemonType, setSelectedPokemonType] = useState('bug');

  const [listGroupedPokemon, setListGroupedPokemon] = useState([]);
  const [pokemonListIndex, setPokemonListIndex] = useState(0);

  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=6';

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
  // useEffect para o painel de cards do bloco Marrom
  useEffect(() => {
    async function fetchData() {
      const response = await getAllPokemon(initialUrl);
      setTotal(response.count);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      /* await loadingPokemon(response.results); */

      setLoading(false);
    }
    fetchData();
  }, []);

  // Funções para modal dos filtros
  const pokemonTypeOptions = getPokemonTypes().map((pokemonType) => ({
    value: pokemonType,
    label: pokemonType,
  }));

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  async function fetchDataByType() {
    const filteredPokemon = await getPokemonByTypeName(selectedPokemonType);
    const conformedPokemon = filteredPokemon.pokemon.map(
      (pokemon) => pokemon.pokemon,
    );

    const pokemonList = sliceIntoChunks(conformedPokemon, 6);
    setListGroupedPokemon(pokemonList);
    await loadingPokemon(pokemonList[0]);
    setPokemonListIndex(0);
  }

  useEffect(() => {
    if (!selectedPokemonType) return;
    fetchDataByType();
  }, [selectedPokemonType]);

  useEffect(() => {
    if (listGroupedPokemon.length) {
      loadingPokemon(listGroupedPokemon[pokemonListIndex]);
    }
  }, [pokemonListIndex]);

  return (
    <div className="blocoMarrom">
      <div className="HeaderBlocoMarrom">
        <div className="select-block">
          <Select
            name="pkType"
            label="Pokemon Type"
            options={pokemonTypeOptions}
            onChange={(evt) => setSelectedPokemonType(evt.target.value)}
          />
        </div>
      </div>
      <div className="linha">
        <hr />
      </div>
      <div className="packDeCards">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="btn">
        <button
          type="button"
          onClick={() =>
            setPokemonListIndex((val) => (val > 0 ? val - 1 : val))
          }
        >
          <img src={backIcon} alt="back" />
        </button>
        <button
          type="button"
          onClick={() =>
            setPokemonListIndex((val) =>
              val < listGroupedPokemon.length - 1 ? val + 1 : val,
            )
          }
        >
          <img src={nextIcon} alt="next" />
        </button>
      </div>
      <div className="pagination-block">
        <div>Qtd {total}</div>
      </div>
    </div>
  );
};

export default BlocoMarrom;
