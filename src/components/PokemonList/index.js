import { useState, useEffect } from "react";
import "./index.css"

function PokemonList({ onPokemonClick }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      setPokemonList(data.results);
      setNextUrl(data.next);
      setIsLoading(false);
    };

    fetchPokemonList();
  }, []);

  const loadMorePokemon = async () => {
    setIsLoading(true);
    const response = await fetch(nextUrl);
    const data = await response.json();
    setPokemonList([...pokemonList, ...data.results]);
    setNextUrl(data.next);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h2 className="main-heading">Pokemon List</h2>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <li className="pokemon-card" key={pokemon.name} onClick={() => onPokemonClick(pokemon.name)}>
            {pokemon.name.toUpperCase ()}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {!isLoading && nextUrl && (
        <button className="button" onClick={loadMorePokemon}>Get More</button>
      )}
    </div>
  );
}

export default PokemonList;
