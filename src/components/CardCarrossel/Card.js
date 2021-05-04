import React from 'react';
import typeColors from '../../helpers/typeColors';
import './style.css';

function CardCarrossel({ pokemon }) {
  return (
    <div className="CardCarrossel">
      <div className="Card__typesCarrossel">
        {pokemon.types.map((type) => (
          <div
            className="Card__typeCarrossel"
            style={{ backgroundColor: typeColors[type.type.name] }}
          >
            {type.type.name}
          </div>
        ))}
      </div>
      <div className="Card__imgCarrossel">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Box__nameCarrossel">
        <div className="Card__nameCarrossel">{pokemon.name}</div>
      </div>
    </div>
  );
}

export default CardCarrossel;
