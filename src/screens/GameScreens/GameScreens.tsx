import { useState } from "react"
import { SCREEN_STATES } from "../../constants";
import { Game } from "./Game";
import { Introduction } from "./Introduction";
import { Score } from "./Score";

export const GameScreens = () => {
const [points, setPoints] = useState<number>(0);
const [currentScreen, setCurrentScreen] = useState(SCREEN_STATES.INTRODUCTION)
    return(
        <div>
    {currentScreen === SCREEN_STATES.INTRODUCTION && <Introduction setCurrentScreen={setCurrentScreen }/>}
    {currentScreen === SCREEN_STATES.GAME && <Game setCurrentScreen={setCurrentScreen} setPoints={setPoints}/>}
    {currentScreen === SCREEN_STATES.SCORE && <Score setCurrentScreen={setCurrentScreen} points={points}/>}
        </div>
    )
}