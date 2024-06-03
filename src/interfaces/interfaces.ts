export interface Genre {
  name: string;
  description: string;
  images: string[];
}

export interface Game {
  _id?: string;
  title: string;
  genre: Genre;
  price: number;
  rating: string;
  description: string;
  img: string;
  developer: string;
  discount: number;
  platform: string;
  features: string[];
  release_date: Date;
  images: string[];
}