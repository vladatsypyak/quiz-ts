import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./finalResults.module.scss";
import Question from "./Question";


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
            <h2 className={s.title}>Результати</h2>
            <div className={s.flex_wrap}>
                {
                    currentGameData ? <div className={s.players_wrap}>
                        {currentGameData.players.map(player => {
                            return <div className={s.player}>
                                <p>{player.name} : <span>{currentGameData.playerStats[player.name]?.correct} / {quiz?.questions.length}</span></p>
                            </div>
                        })}
                    </div> : null

                }
                {

                    quiz && currentGameData ? <div className={s.questions_wrap}>
                        {quiz?.questions.map((questionData: any, questionIndex: number) => {
                            return <Question  questionData={questionData} questionIndex={questionIndex} countPercentOfCorrectOptions={countPercentOfCorrectOptions} currentGameData={currentGameData}/>
                        })}
                    </div> : null
                }


            </div>

        </div>


    )
}
export default FinalResults
