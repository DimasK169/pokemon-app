import { useState, useEffect } from "react";
import { getPokemonList,getPokemonSprites } from "../service/pokemonList/api";
import { Result, Root, Pic } from "../service/type";

interface PokemonWithSprite extends Result {
  sprite?: string;
}

export const usePokemonList = (offset: number, limit: number) => {
  const [pokeList, setPokeList] = useState<PokemonWithSprite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: Root | undefined = await getPokemonList(offset, limit);
        if (response) {
          const enhancedPokeList = await Promise.all(
            response.results.map(async (pokemon) => {
              const spriteData: Pic | undefined = await getPokemonSprites(pokemon.name);
              return {
                ...pokemon,
                sprite: spriteData?.sprites.other?.dream_world?.front_default,
              };
            })
          );
          setPokeList(enhancedPokeList);
          console.log(enhancedPokeList)
        }
      } catch (err) {
        setError("Failed to fetch Pokémon list.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  return { pokeList, loading, error };
};
