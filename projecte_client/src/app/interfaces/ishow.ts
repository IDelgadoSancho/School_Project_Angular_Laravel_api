import { IDirector } from "./idirector";

export interface IShow {
    id: number;
    directors: IDirector[];
    title: string;
    dataP: string;
    seasons: string;
    image: string | null;

}
