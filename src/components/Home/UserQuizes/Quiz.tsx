import React, {useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {QuizType} from "../../../redux/slices/quizzesSlice";


const Quiz = ({quiz}: {quiz:QuizType}) => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()
    console.log(quiz)
    function onQuizClick() {
        navigate(`/fullQuiz/${quiz.id}`)
    }
    return (
        <div onClick={onQuizClick} className={s.quiz_wrapper}>
            <p>{quiz.title}</p>
            <div className={s.buttons}>
                <p>Грати</p>
                <p>Р</p>
            </div>

        </div>
    )
}
export default Quiz
