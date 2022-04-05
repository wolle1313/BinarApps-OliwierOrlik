import { Dispatch, SetStateAction } from "react";
import { gameInfoTypes } from "../../../types";

interface WordCloudProps {
    gameData: gameInfoTypes;
    selectedWords: string[];
    setSelectedWords: Dispatch<SetStateAction<string[]>>;
    isGameConcluded: boolean;
}

export const WordCloud = ({gameData, selectedWords, setSelectedWords, isGameConcluded }: WordCloudProps) => {

    const onWordPress = (word: string) => {
        if(selectedWords.includes( word)) {
          const newSelectedWords = selectedWords.filter(singleWord => singleWord !== word)
          setSelectedWords([...newSelectedWords])
        }
        else {
            setSelectedWords((prevState) => [...prevState, word])
        }
    }

    function checkWord(word: string) {
       if (gameData.good_words.includes(word)) {
        return 'goodWord'
       }
       return 'badWord'
    }

    function createCloud() {
        const cloud: JSX.Element[] = []
        let cloudRow: JSX.Element[] = [];
        let wordsCounter = 0;
        const singleWordAction = (word: string) => {
            if(isGameConcluded) {
                checkWord(word)
                cloudRow.push(
                    <div key={word} className={`cloudWord ${selectedWords.includes(word) ? checkWord(word) : ''}`}>{word}</div>
                    )
            }
            else {
                cloudRow.push(
                    <div key={word} onClick={() => onWordPress(word)} className={`cloudWord canSelect ${selectedWords.includes(word) ? 'selectedWord' : ''}`}>{word}</div>
                    )
                }
                wordsCounter++;
        }
    for(let i = 0; wordsCounter < gameData.all_words.length; i++) {

        if((i === 0 || i % 4 === 0) && gameData.all_words.length - wordsCounter > 3) {
            for(let i = 0; i < 4; i++) {
                singleWordAction(gameData.all_words[wordsCounter])
            }
                cloud.push(<div className="row firstRow">{cloudRow}</div>)
        }

        else if(i % 4 === 1 && gameData.all_words.length - wordsCounter > 2) {
            for(let i = 0; i < 3; i++) {
                    singleWordAction(gameData.all_words[wordsCounter])
                }
                cloud.push(<div className="row secRow">{cloudRow}</div>)

        }

        else if(i % 4 === 2 && gameData.all_words.length - wordsCounter > 1) {
            for(let i = 0; i < 2; i++) {
                    singleWordAction(gameData.all_words[wordsCounter])
                }
                cloud.push(<div className="row thirdRow">{cloudRow}</div>)
        }

        else if(i % 4 === 3 && gameData.all_words.length - wordsCounter > 2) {
            for(let i = 0; i < 3; i++) {
                    singleWordAction(gameData.all_words[wordsCounter])
                }
                cloud.push(<div className="row fourthRow">{cloudRow}</div>)
        }

        else {
            for(let i = 0; i <gameData.all_words.length - wordsCounter; i++) {
                singleWordAction(gameData.all_words[wordsCounter])
            }
            cloud.push(<div className="fourthRow">{cloudRow}</div>)
        }

        cloudRow = []
    }
    return cloud
}

    return (
        <div className="wordCloud">
            {createCloud()}
        </div>
    )
}