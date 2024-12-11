import React, {useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import { getFirestore } from "firebase/firestore";
import {QuizType} from "../../../redux/slices/quizzesSlice";
import Quiz from "./Quiz";

const UserQuizzes = ({quizzes} : {quizzes: QuizType[]}) => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()


    return (
        <div className={s.wrapper}>
            {
                quizzes.map((el)=> {
                    console.log(el)
                    return (

                            <Quiz  quiz={el}/>
                    )
                })
            }
        </div>
    )
}
export default UserQuizzes
