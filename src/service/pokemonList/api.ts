import axiosWithConfig from "../api";
import { Pic, Root } from "../type";

export const getPokemonList = async (offset: number, limit: number = 10) => {
  try {
    const response = await axiosWithConfig.get(
      `pokemon/?offset=${offset}&limit=${limit}`
    );
    return response.data as Root | undefined;
  } catch (error) {
    console.error("Mega Gaming Error:", error);
  }
};

export const getPokemonSprites = async (pokemonName: string) => {
  try {
    const response = await axiosWithConfig.get(`pokemon/${pokemonName}`);
    return response.data as Pic | undefined;
  } catch (error) {
    console.error("Mega Gaming Error:", error);
  }
};
