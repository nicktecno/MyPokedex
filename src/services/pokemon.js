const URL = 'https://pokeapi.co/api/v2';

export function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export function getPokemonByTypeName(typeName) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/type/${typeName}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

// ${typeName}
