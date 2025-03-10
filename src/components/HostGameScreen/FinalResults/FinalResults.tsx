import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./finalResults.module.scss";


const FinalResults = () => {
    const currentGameData = useSelector((state: RootState) => state.quizzesSlice.currentGameData)
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)

    const countPercentOfCorrectOptions = (questionIndex: number) => {
       const numberOfCorrect =  currentGameData?.questionsStats[questionIndex]
        console.log(numberOfCorrect)
        const totalAnswers = currentGameData?.players.length || 0
        return numberOfCorrect * 100 / totalAnswers
    }
    return (
        <div className={s.wrapper}>
            {
                currentGameData ? <div className={s.players_wrap}>
                    {currentGameData.players.map(player => {
                        return <div className={s.player}>
                            <p>{player.name} : {currentGameData.playerStats[player.name]?.correct} / {quiz?.questions.length}</p>
                        </div>
                    })}
                </div> : null

            }
            {

                quiz && currentGameData ? <div>
                    {quiz?.questions.map((questionData: any, questionIndex: number) => {
                        return (
                            <div className={s.question_wrap}>
                                <div className={s.question}>
                                    {questionData.question}
                                    <p>percent: {countPercentOfCorrectOptions(questionIndex)}</p>
                                </div>
                                {questionData.options.map((option: any, optionIndex: number) => {
                                    return <div className={`${s.option} ${option.isCorrect ? s.correct : null}`}>
                                        <p>{option.text}</p>
                                        {option.image ? <img src={option.image} alt=""/> : null}
                                        <p>chosen: {currentGameData.results[questionIndex][optionIndex]?.length || 0} / {currentGameData.players.length}</p>
                                    </div>

                                })
                                }
                            </div>
                        )
                    })}
                </div> : null
            }


        </div>


    )
}
export default FinalResults
