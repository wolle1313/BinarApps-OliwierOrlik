import { useEffect } from 'react';
import './App.css';
import { Failed } from './screens/Failed';
import { GameScreens } from './screens/GameScreens';
import { Loading } from './screens/Loading';
import { fetchGameInfo, selectedGameInfo } from './store/gameInfoSlice';
import { useAppDispatch, useAppSelector } from './store/store';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGameInfo())
  }, [])
  const gameInfo = useAppSelector(selectedGameInfo)
  const gameInfoStatus = gameInfo.status
  return (
    <div className="App">
      {gameInfoStatus === "loading" && <Loading />}
      {gameInfoStatus === "failed" && <Failed/>}
      {gameInfoStatus === "success" && <GameScreens/>}
    </div>
  );
}

export default App;
