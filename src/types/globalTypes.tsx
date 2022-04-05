 export interface gameInfoTypes {
    question: string;
    all_words: string[];
    good_words: string[];
 }
 export interface gameInfoData {
     gameInfo: gameInfoTypes[];
     status: string;
     currentNumber: number;
 }
 export type currentScreen = (currentScreen: string) => void;