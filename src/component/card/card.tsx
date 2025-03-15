import { Result, Sprites } from "../../service/type";
import { Link } from "react-router-dom";

interface CardProps {
  pokemonName: Result;
  sprites: Partial<Sprites>;
}

const Card: React.FC<CardProps> = ({ pokemonName, sprites }) => {
  const { name } = pokemonName;
  const imageUrl =
    sprites.other?.dream_world?.front_default || sprites.front_default || "";

  return (
    <Link to={`/${name}`} className="flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition">
      <img
        src={imageUrl}
        alt={name}
        className="rounded-t-xl w-full h-[200px] object-contain"
      />
      <div className="flex flex-col p-4">
        <h1 className="text-lg font-bold capitalize text-center">{name}</h1>
      </div>
    </Link>
  );
};

export default Card;
