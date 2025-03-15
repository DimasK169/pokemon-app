import { useEffect, useState } from "react";
import { getPokemonDetails } from "../service/pokemonList/api";
import { PokemonDetail } from "../service/type";


export const usePokemonDetail = (id: string) => {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      setError(null);
      try {
       const data = await getPokemonDetails(id);
       if(data)
       setDetail(data);
      } catch (err) {
        setError("Failed to fetch Pokémon detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, []);

  return { detail, loading, error };
};
