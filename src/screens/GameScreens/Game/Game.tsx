import { selectedGameInfo } from "../../../store/gameInfoSlice";
import { useAppSelector } from "../../../store/store";
import { currentScreen } from "../../../types";
import { WordCloud } from "./WordCloud";
import './styles/WordCloud.css'
import { Dispatch, SetStateAction, useState } from "react";
import { SCREEN_STATES } from "../../../constants";
import { globalStyles } from "../../../styles/globalStyles";

interface GameProps {
    setCurrentScreen: currentScreen;
     setPoints: Dispatch<SetStateAction<number>>;
}

export const Game = ({setCurrentScreen, setPoints} : GameProps) => {
    const [isGameConcluded, setIsGameConcluded] = useState(false);
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const gameInfoData = useAppSelector(selectedGameInfo)
    const gameInfo = gameInfoData.gameInfo[gameInfoData.currentNumber];

    function finishGame() {
        let goodWords = gameInfo.good_words;
        let countedPoints = 0
        selectedWords.forEach(word => {
            if(gameInfo.good_words.includes(word)) {
                countedPoints += 2;
                goodWords = goodWords.filter(singleWord => singleWord !== word)
            }
            else {
                countedPoints--;
            }

        });
        setPoints(countedPoints - goodWords.length)

        setCurrentScreen(SCREEN_STATES.SCORE);
    }
    return(
        <div style={globalStyles.wrapper}>
            <div>
                <h1>{gameInfo.question}</h1>
            </div>
            <WordCloud gameData={gameInfo} selectedWords={selectedWords} setSelectedWords={setSelectedWords} isGameConcluded={isGameConcluded}/>
            <div>
                {isGameConcluded ? 
                (<button className="gameBtn" onClick={finishGame}>finish game</button>)
                :(<button className="gameBtn" onClick={() => setIsGameConcluded(true)}>Check Answers</button>)}
            </div>
        </div>
    )
}