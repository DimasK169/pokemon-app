import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

const CatchPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, loading, error } = usePokemonDetail(id as string);
  
  const [isCatching, setIsCatching] = useState(false);
  const [catchResult, setCatchResult] = useState<null | "success" | "failed">(null);
  const [showMessage, setShowMessage] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  const handleCatch = () => {
    setIsCatching(true);
    
    // Simulating catch attempt with animation
    setTimeout(() => {
      const success = Math.random() >= 0.5; // 50% catch rate
      setCatchResult(success ? "success" : "failed");
      setShowMessage(true);
      
      if (success) {
        // You might want to save caught Pokemon to local storage or context
        console.log(`Caught ${detail?.name}!`);
      }
      
      setIsCatching(false);
    }, 1500);
  };

  const handleRun = () => {
    // Navigate back or to a different route
    navigate(`/${id}`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const handleSavePokemon = () => {
    // Save the caught Pokemon with the given name
    // This would typically involve storing in context, state management, or local storage
    const caughtPokemon = {
      id: detail?.id,
      name: pokemonName || detail?.name,
      sprite: detail?.sprites?.other.dream_world.front_default,
      originalName: detail?.name,
      caughtAt: new Date().toISOString()
    };
    
    console.log("Saving caught Pokemon:", caughtPokemon);
    
    // Example: Store in local storage
    const existingPokemon = JSON.parse(localStorage.getItem("caughtPokemon") || "[]");
    localStorage.setItem(
      "caughtPokemon", 
      JSON.stringify([...existingPokemon, caughtPokemon])
    );
    
    // Navigate to a page showing caught Pokemon or back to the main page
    navigate("/my-pokemon");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Wild Pokémon appearing...</p>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-lg font-medium text-gray-700">No Pokémon found in this area</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 p-4 text-center">
          <h2 className="text-xl font-bold text-white">Wild <span className="capitalize">{detail.name}</span> appeared!</h2>
        </div>
        
        <div className="flex flex-col items-center p-8">
          {/* Pokemon Sprite */}
          <div className={`w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6 ${isCatching ? 'animate-bounce' : ''}`}>
            {detail?.sprites?.versions["generation-v"]["black-white"].animated.front_default ? (
              <img 
                src={detail.sprites.versions["generation-v"]["black-white"].animated.front_default} 
                alt={detail.name} 
                className={`w-40 h-40 ${catchResult === "success" ? 'opacity-50' : ''}`} 
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            )}
            
            {/* Pokeball animation when catching */}
            {isCatching && (
              <div className="absolute w-12 h-12 bg-white rounded-full border-4 border-red-500 before:content-[''] before:absolute before:w-12 before:h-1 before:bg-red-500 before:top-1/2 before:-translate-y-1/2 animate-ping"></div>
            )}
          </div>
          
          {/* Catch Result Message */}
          {showMessage && !isCatching && (
            <div className={`mb-6 p-3 rounded-md text-center w-full ${
              catchResult === "success" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {catchResult === "success"
                ? <div>Gotcha! <span className="capitalize">{detail.name}</span> was caught!</div>
                : <div>Oh no! <span className="capitalize">{detail.name}</span> broke free!</div>}
            </div>
          )}
          
          {/* Input field for naming Pokemon if caught */}
          {catchResult === "success" && (
            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Give your new Pokémon a nickname:
              </label>
              <input
                type="text"
                placeholder={detail.name}
                value={pokemonName}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:capitalize"
              />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex space-x-4 w-full">
            {catchResult === "success" ? (
              <button
                onClick={handleSavePokemon}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition"
              >
                Add to Collection
              </button>
            ) : catchResult === "failed" ? (
              <div className="flex w-full space-x-4">
                <button
                  onClick={() => {
                    setCatchResult(null);
                    setShowMessage(false);
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition"
                >
                  Try Again
                </button>
                <button
                  onClick={handleRun}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition"
                >
                  Run Away
                </button>
              </div>
            ) : (
              <div className="flex w-full space-x-4">
                <button
                  onClick={handleCatch}
                  disabled={isCatching}
                  className={`flex-1 ${
                    isCatching 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-red-500 hover:bg-red-600"
                  } text-white font-medium py-3 px-4 rounded-md transition`}
                >
                  {isCatching ? "Throwing..." : "Throw Poké Ball"}
                </button>
                <button
                  onClick={handleRun}
                  disabled={isCatching}
                  className={`flex-1 ${
                    isCatching 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white font-medium py-3 px-4 rounded-md transition`}
                >
                  Run Away
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatchPokemon;