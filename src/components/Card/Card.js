import React from 'react';
import typeColors from '../../helpers/typeColors';
import './style.css';

function Card({ pokemon }) {
  return (
    <div className="Card">
      <div className="Card__types">
        {pokemon.types.map((type) => (
          <div
            className="Card__type"
            style={{ backgroundColor: typeColors[type.type.name] }}
          >
            {type.type.name}
          </div>
        ))}
      </div>
      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Box__name">
        <div className="Card__name">{pokemon.name}</div>
      </div>
    </div>
  );
}

export default Card;
