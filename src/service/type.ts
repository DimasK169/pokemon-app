export interface Root {
  count: number;
  next?: string;
  previous?: string;
  results: Result[];
}

export interface Result extends Root {
  name: string;
  url: string;
}

export interface Pic extends Root {
  sprites: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other?: {
    dream_world?: {
      front_default: string;
      front_female: string | null;
    };
  };
}
