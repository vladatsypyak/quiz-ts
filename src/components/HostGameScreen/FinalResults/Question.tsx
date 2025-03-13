import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./finalResults.module.scss";


const Question = ({questionData, countPercentOfCorrectOptions,currentGameData, questionIndex} :{questionData: any, countPercentOfCorrectOptions: any, questionIndex: number, currentGameData: any}) => {
const [showOptions, setShowOptions] = useState(false)
    return (
        <div onClick={()=>{setShowOptions(!showOptions)}} className={s.question_wrap}>
            <div className={s.question}>
                <p>{questionIndex +1}) {questionData.question}</p>
                <p>{countPercentOfCorrectOptions(questionIndex)}%</p>
            </div>

            {showOptions ? questionData.options.map((option: any, optionIndex: number) => {
                    return <div className={`${s.option} ${option.isCorrect ? s.correct : null}`}>
                        {option.image ? <img src={option.image} alt=""/> : null}
                        <p className={s.text}>{option.text} - <span>{currentGameData.results[questionIndex][optionIndex]?.length || 0}</span></p>
                    </div>
                }) : null}
        </div>
    )
}
export default Question
