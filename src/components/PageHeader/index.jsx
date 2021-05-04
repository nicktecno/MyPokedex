/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import competiLogo from '../../assets/images/competiLogo.svg';
import pokemonLogo from '../../assets/images/pokemonLogo.svg';

import './styles.css';

const PageHeader = () => {
  const [pokemon, setPokemon] = useState('pikachu');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [modalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
    setIsModalVisible(true);
  };

  return (
    <>
      <header className="page-header">
        <div className="top-bar-container">
          <div className="logo-pokemon">
            <img src={pokemonLogo} alt="pokemonLogo" />
          </div>
          <div className="input-div">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Search Pokémon"
              />
            </form>
          </div>
          <Link to="/login">Login</Link>
          <div className="logoCompeti">
            <img src={competiLogo} alt="Proffy" />
          </div>
        </div>
      </header>
      {modalVisible &&
        pokemonData.map((data) => (
          <>
            <div className="containerGeral" />
            <div className="containerModal">
              <img src={data.sprites.front_default} alt="sprites" />
              <div className="botaoFechar">
                <div
                  className="close-container"
                  onClick={() => setIsModalVisible(false)}
                >
                  <div className="leftright" />
                  <div className="rightleft" />
                  <label className="close">close</label>
                </div>
              </div>
              <div className="divTable">
                <div className="divTableBody">
                  <div className="divTableRow">
                    <strong className="divTableCell">Type</strong>
                    <div className="divTableCell">{pokemonType}</div>
                  </div>
                  <div className="divTableRow">
                    <strong className="divTableCell">Height</strong>
                    <div className="divTableCell">
                      {' '}
                      {Math.round(data.height * 10)}
                      cm
                    </div>
                  </div>
                  <div className="divTableRow">
                    <strong className="divTableCell">Weight</strong>
                    <div className="divTableCell">
                      {' '}
                      {Math.round(data.weight / 4.3)} lbs
                    </div>
                  </div>
                  <div className="divTableRow">
                    <strong className="divTableCell">Number of Battles</strong>
                    <div className="divTableCell">
                      {data.game_indices.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
};

export default PageHeader;
