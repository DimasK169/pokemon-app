import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Type definition for caught Pokemon
type CaughtPokemon = {
  id: number;
  name: string;
  originalName: string;
  sprite: string;
  caughtAt: string;
};

const CaughtPokemonCollection = () => {
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load caught Pokemon from localStorage
    const loadCaughtPokemon = () => {
      try {
        const savedPokemon = localStorage.getItem("caughtPokemon");
        if (savedPokemon) {
          setCaughtPokemon(JSON.parse(savedPokemon));
        }
      } catch (error) {
        console.error("Error loading caught Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaughtPokemon();
  }, []);

  const handleReleasePokemon = (id: number, caughtAt: string) => {
    // Create a unique identifier for the specific Pokemon
    const pokemonIdentifier = `${id}-${caughtAt}`;
    
    // Filter out the specific Pokemon
    const updatedCollection = caughtPokemon.filter(
      pokemon => `${pokemon.id}-${pokemon.caughtAt}` !== pokemonIdentifier
    );
    
    // Update state and localStorage
    setCaughtPokemon(updatedCollection);
    localStorage.setItem("caughtPokemon", JSON.stringify(updatedCollection));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Pokémon Collection
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : caughtPokemon.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg font-medium text-gray-700">Your collection is empty</p>
            <p className="text-gray-500 mt-2">Catch some Pokémon to get started!</p>
            <Link
              to="/"
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Find Pokémon
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {caughtPokemon.map((pokemon) => (
              <div
                key={`${pokemon.id}-${pokemon.caughtAt}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between p-4 bg-blue-500">
                  <div className="flex items-center">
                    <span className="ml-2 text-white text-lg font-medium capitalize">
                      {pokemon.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleReleasePokemon(pokemon.id, pokemon.caughtAt)}
                    className="text-white opacity-70 hover:opacity-100 transition"
                    title="Release Pokémon"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                      {pokemon.sprite ? (
                        <img
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          className="w-24 h-24"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    {pokemon.originalName !== pokemon.name && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Original: </span>
                        <span className="capitalize">{pokemon.originalName}</span>
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Caught: </span>
                      {formatDate(pokemon.caughtAt)}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/${pokemon.id}`}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/${pokemon.id}/catch`}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      Find Another
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && caughtPokemon.length > 0 && (
          <div className="mt-6 flex justify-between">
            <Link 
              to="/"
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
            >
              Back to Pokémon List
            </Link>
            <span className="text-sm text-gray-500 flex items-center">
              {caughtPokemon.length} Pokémon in your collection
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaughtPokemonCollection;