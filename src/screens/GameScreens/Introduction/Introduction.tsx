import { useState } from "react";
import { SCREEN_STATES } from "../../../constants";
import { changeNumber } from "../../../store/gameInfoSlice";
import { setName } from "../../../store/nameSlice";
import { useAppDispatch } from "../../../store/store";
import { globalStyles } from "../../../styles/globalStyles";
import { currentScreen } from "../../../types";
import './styles/Introduction.css'
interface IntroductionProps {
    setCurrentScreen: currentScreen
}

export const Introduction = ({setCurrentScreen}: IntroductionProps ) => {
    const [userName, setUserName] = useState('')
    const [nameError, setNameError] = useState(false)
    const dispatch = useAppDispatch()
   const confirmName = () => {
       if(userName.length >= 3) {
           dispatch(setName(userName))
           dispatch(changeNumber())
           setCurrentScreen(SCREEN_STATES.GAME)
           return
       }
       setNameError(true)

   }
    return(
        <div style={globalStyles.wrapper}>
            <div>
            <h1>Wordcloud game</h1>
            </div>
            <div className="inputWrapper">
                <div className="error">{nameError ? 'Your name should have at least 3 characters' : ""}</div>
                <input className="nameInput" onFocus={() => setNameError(false)} placeholder="Enter your nickname here..." onInput={(e) => setUserName((e.target as HTMLInputElement).value)} value={userName} type="text"/>
            </div>
            <div>
                <button className="playBtn" onClick={confirmName}>play</button>
            </div>
        </div>
    )
}