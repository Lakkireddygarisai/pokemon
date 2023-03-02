import { useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetail";
import "./App.css";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  return (
    <div className="app">
      {selectedPokemon ? (
        <PokemonDetails pokemonName={selectedPokemon} />
      ) : (
        <PokemonList onPokemonClick={handlePokemonClick} />
      )}
    </div>
  );
}

export default App;
