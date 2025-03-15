import { Link, useParams } from "react-router";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

const Detail = () => {
  const { id } = useParams();
  const { detail, error, loading } = usePokemonDetail(id as string);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading Pokémon data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mx-auto">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
            Error Loading Pokémon
          </h2>
          <p className="mt-2 text-center text-gray-600">
            We couldn't fetch the Pokémon data. Please try again.
          </p>
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Pokemon Header */}
          <div className="bg-blue-500 p-6 sm:p-8">
            <Link to="/" className="flex items-center gap-2 text-white mb-4 font-semibold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </Link>
            <div className="flex flex-col sm:flex-row items-center">
              {detail.sprites.other?.dream_world?.front_default && (
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white bg-opacity-20 rounded-full p-2 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <img
                    src={detail.sprites.other.dream_world.front_default}
                    alt={detail.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start">
                  <p className="text-blue-100 font-medium">
                    #{detail.id.toString().padStart(3, "0")}
                  </p>
                  <div className="mx-2 w-1 h-1 bg-blue-200 rounded-full"></div>
                  <div className="flex space-x-2">
                    {detail.types?.map((type) => (
                      <span
                        key={type.type.name}
                        className="text-xs font-semibold bg-white bg-opacity-30 text-black px-2 py-1 rounded-full uppercase"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                <h1 className="mt-2 text-3xl font-bold text-white capitalize">
                  {detail.name}
                </h1>
                <p className="mt-1 text-blue-100">
                  Height: {detail.height / 10}m | Weight: {detail.weight / 10}kg
                </p>
              </div>
            </div>
          </div>

          {/* Catch Pokemon Button */}
          <div className="p-4 bg-gray-50 flex justify-center">
            <Link
              to={`/${detail.id}/catch`}
              className="flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  d="M2 10h4m8 0h4"
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              Try to Catch this Pokémon!
            </Link>
          </div>

          {/* Pokemon Details */}
          <div className="p-6 sm:p-8">
            {/* Stats */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Base Stats
              </h2>
              <div className="space-y-3">
                {detail.stats?.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {stat.base_stat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {detail.abilities?.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ability.is_hidden
                        ? "bg-gray-100 text-gray-600 border border-gray-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {ability.ability.name.replace("-", " ")}
                    {ability.is_hidden && " (Hidden)"}
                  </span>
                ))}
              </div>
            </div>

            {/* Moves */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Moves</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {detail.moves?.slice(0, 12).map((move) => (
                  <span
                    key={move.move.name}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 capitalize"
                  >
                    {move.move.name.replace("-", " ")}
                  </span>
                ))}
                {detail.moves?.length > 12 && (
                  <span className="px-3 py-1 bg-gray-50 rounded-lg text-sm text-gray-500 flex items-center justify-center">
                    +{detail.moves.length - 12} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
