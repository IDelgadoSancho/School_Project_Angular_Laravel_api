import { IDirector } from "./idirector";

export interface IFilm {
    id: number;
    autor: IDirector;
    title: string;
    dataP: string;
    duration: string;
    director_id: number;
}
