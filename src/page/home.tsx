import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const { pokeList, loading, error } = usePokemonList(offset, limit);

  const handleNextPage = () => setOffset((prevOffset) => prevOffset + limit);
  const handlePreviousPage = () => setOffset((prevOffset) => Math.max(0, prevOffset - limit));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokeList.map((pokemon, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            {pokemon.sprite && (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-20 h-20 object-contain mb-2"
              />
            )}
            <p className="font-medium capitalize">{pokemon.name}</p>
            <a
              href={pokemon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePreviousPage} 
          className="px-4 py-2 bg-blue-300 hover:bg-blue-500 rounded-lg disabled:opacity-50"
          disabled={offset === 0}>
          Previous
        </button>
        <button 
          onClick={handleNextPage} 
          className="px-4 py-2 bg-blue-300 hover:bg-blue-500 text-white rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;