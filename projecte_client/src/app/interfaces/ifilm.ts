import { IDirector } from "./idirector";

export interface IFilm {
    id: number;
    director: IDirector;
    title: string;
    dataP: string;
    duration: string;
    director_id: number;
    image: string | null;
}
