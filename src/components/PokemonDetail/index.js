import { useState, useEffect } from "react";
import "./index.css"

function PokemonDetails({ pokemonName }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!pokemonData) {
    return null;
  }

  const { name, sprites, types, stats } = pokemonData;

  return (
    <div className="pokemon-details">
        <h2 className="pokemon-name">{name.toUpperCase()}</h2>
        <img className="pokemon-details-img" src={sprites.front_default} alt={name} />
        <div className="pokemon-features">
          <div className="Type-feature">
            <h3 className="Heading">Type</h3>
            <ul className="Type-list">
              {types.map((type) => (
                <li  className="list-item" key={type.type.name}>{type.type.name.toUpperCase()}</li>
              ))}
            </ul>
          </div>
          <div className="status-feature">
            <h3 className="Heading">Stats</h3>
            <ul className="status">
              {stats.map((stat) => (
                <li className="list-item" key={stat.stat.name}>
                  {stat.stat.name.toUpperCase()}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      );
    }
    
    export default PokemonDetails;

     
