import { SCREEN_STATES } from "../../../constants";
import { changeNumber } from "../../../store/gameInfoSlice";
import { selectedName } from "../../../store/nameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { globalStyles } from "../../../styles/globalStyles";
import { currentScreen } from "../../../types";
import './styles/Score.css'
interface ScoreProps {
    setCurrentScreen: currentScreen;
     points: number
}

export const Score = ({setCurrentScreen, points}: ScoreProps) => {

    const dispatch = useAppDispatch()
    const name = useAppSelector(selectedName)
    function newGame() {
        dispatch(changeNumber())

        setCurrentScreen(SCREEN_STATES.GAME);

    }
    return(
        <div style={globalStyles.wrapper}>
            <div className="title">Congratulations, {name}!</div>
            <div className="title">Your score:</div>
            <div className="title points">{points} points</div>
            <button className="newGameBtn"  onClick={newGame}>Try again</button>
        </div>
    )
}