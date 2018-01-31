import User from "./user";
import City from "./city";

export interface GameOptions {
    difficulty: string;
}

export interface Round {
    number: number;
    city: City;
    guesses: Guess[];
}

export interface Guess {
    user: User;
    coordinates: { latitude: number; longitude: number };
    time: number;
    score: number;
}

export default interface Game {
    _id?: string;
    users?: User[];
    rounds?: Round[];
    difficulty?: string;
};
