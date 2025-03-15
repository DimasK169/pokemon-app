import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import Card from "../component/card/card";

const PokemonListPage = () => {
  const [offset, setOffset] = useState(0);
  const limit = 12; // Increased to 12 for better grid layout
  const { pokeList, loading, error } = usePokemonList(offset, limit);

  const handleNextPage = () => setOffset((prevOffset) => prevOffset + limit);
  const handlePreviousPage = () => setOffset((prevOffset) => Math.max(0, prevOffset - limit));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-800">Pokédex</h1>
            <p className="text-gray-600 mt-1">
              Showing Pokémon {offset + 1} - {offset + (pokeList.length || 0)}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Pokemon Grid - Fixed spacing */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {pokeList.map((pokemon, index) => (
              <div 
                key={index} 
                className="transform hover:scale-105 transition duration-200"
                style={{ height: 'fit-content' }}
              >
                <Card pokemonName={pokemon} sprites={{ front_default: pokemon.sprite || "" }} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button 
              onClick={handlePreviousPage} 
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={offset === 0}
            >
              <svg className="mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            
            <span className="text-sm text-gray-500">
              Page {Math.floor(offset / limit) + 1}
            </span>
            
            <button 
              onClick={handleNextPage} 
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Next
              <svg className="ml-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonListPage;