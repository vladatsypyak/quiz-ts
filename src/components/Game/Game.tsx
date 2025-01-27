import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./quizTemplate.module.scss"



// @ts-ignore
const Game = ( quizData ) => {

const [questionNumber, setQuestionNumber] = useState(0)
    return (
        <div>
           <p>{quizData[questionNumber].question}</p>
            {quizData[questionNumber].options.map((option :any) =>{
                return (
                    <div>
                        <p>{option.text}</p>
                        <img src={option.image} alt=""/>
                    </div>
                )
            })}
            <button onClick={()=>setQuestionNumber(questionNumber + 1)}>next</button>
        </div>

    )
}
export default Game
