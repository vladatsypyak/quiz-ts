import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./questionResults.module.scss";


const QuestionResults = ({gameData, onNextRoundClick}: { gameData: any, onNextRoundClick: any }) => {
    const currentGameData = useSelector((state: RootState) => state.quizzesSlice.currentGameData)
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)

    if (!currentGameData) return null
    const roundNumber = currentGameData.currentQuestion

    if (currentGameData.results.length == 0) {
        return (
            <div className={s.wrapper}>
                {quiz && <div>
                    <div className={s.question_wrap}><p>{quiz.questions[roundNumber].question}</p></div>
                    <div className={s.options}>
                        {quiz.questions[roundNumber].options.map((option: any) => {
                            return (
                                <div className={s.option}>
                                    <p>{option.text}</p>

                                    <div style={{width: "50%"}} className={s.option_bg}>

                                    </div>
                                    {option.image ? <img src={option.image} alt=""/> : null}

                                </div>
                            )
                        })}
                    </div>
                    <div className={s.bottom_wrap}>
                        <p className={s.text}>Відповіли 3\3</p>
                        <button className={s.btn} onClick={onNextRoundClick}>next</button>
                    </div>

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
        <div className={s.wrapper}>
            {quiz && <div>
                <div className={s.question_wrap}><p>{quiz.questions[roundNumber].question}</p></div>
                <div className={s.options}>
                    {quiz.questions[roundNumber].options.map((option: any, index) => {
                        return (
                            <div className={s.option}>
                               <div style={{width: calculatePercent(index)}} className={s.option_bg}>

                               </div>
                                <p>{option.text}</p>
                                {option.image ? <img src={option.image} alt=""/> : null}
                            </div>
                        )
                    })}
                </div>
                <div className={s.bottom_wrap}>
                    <p className={s.text}>Відповіли 3\3</p>
                    <button className={s.btn} onClick={onNextRoundClick}>next</button>
                </div>

            </div>}
        </div>


    )
}
export default QuestionResults
