import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";


const QuestionResults = ({gameData, onNextRoundClick}: { gameData: any, onNextRoundClick: any }) => {
    const currentGameData = useSelector((state: RootState) => state.quizzesSlice.currentGameData)
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)

    if (!currentGameData) return null
    const roundNumber = currentGameData.currentQuestion

    if (currentGameData.results.length == 0) {
        return (
            <div>
                {quiz && <div>
                    <p>{quiz.questions[roundNumber].question}</p>
                    {quiz.questions[roundNumber].options.map((option: any, index) => {
                        return (
                            <div>
                                <p>{option.text}</p>
                                <p>{0}</p>
                                <img src={option.image} alt=""/>
                            </div>
                        )
                    })}
                    <button onClick={onNextRoundClick}>next round</button>

                </div>}
            </div>
        )
    }


    const getNumberOfChosenOption = (optionNumber: number) => {
        const currentQuestion = currentGameData.results[roundNumber]
        if(!currentQuestion || !currentQuestion[optionNumber]) return 0
        return currentQuestion[optionNumber].length
    }
    const getTotalAnswers = (roundNumber: number): number =>{
        if(!currentGameData.results[roundNumber]) return 0
        return Object.values(currentGameData.results[roundNumber]).reduce((acc: any, el: any) => {
            return acc + Object.values(el).length;
        }, 0) as number
    }
    const calculatePercent = (number: number) => {
        if(getNumberOfChosenOption(number) === 0) return 0
        return getNumberOfChosenOption(number) / getTotalAnswers(roundNumber) *  100
    }
    return (
        <div>
            {quiz && <div>
                <p>{quiz.questions[roundNumber].question}</p>
                {quiz.questions[roundNumber].options.map((option: any, index) => {
                    return (
                        <div>
                            <p>{option.text}</p>
                            <p>{getNumberOfChosenOption(index)}</p>
                            <p>{calculatePercent(index)}</p>

                            <img src={option.image} alt=""/>
                        </div>
                    )
                })}
                <button onClick={onNextRoundClick}>next round</button>

            </div>}
        </div>

    )
}
export default QuestionResults
