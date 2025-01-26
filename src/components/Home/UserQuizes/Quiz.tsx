import React, {useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {QuizType} from "../../../redux/slices/quizzesSlice";
import {db} from "../../../firebase";
import {doc, setDoc} from "firebase/firestore";


const Quiz = ({quiz}: { quiz: QuizType }) => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()
    console.log(quiz)

    function onQuizClick() {
        navigate(`/fullQuiz/${quiz.id}`)
    }

    const onHostClick = async (quizId: any) => {
        console.log(quizId)
        const gameRef = doc(db, "games", quizId);
        const gameCode = Math.floor((Math.random()*1000)).toString().slice(0,5)
        try {
            await setDoc(gameRef, {
                quizId: quizId,
                gameCode: gameCode,
                status: "started",
                players: {},
                results: {},
                currentQuestion: 1,
            });
            console.log("Game started");
        } catch (error) {
            console.error("Error starting game: ", error);
        }
    }
    return (
        <div onClick={onQuizClick} className={s.quiz_wrapper}>
            <p>{quiz.title}</p>
            <div className={s.buttons}>
                <p onClick={()=>onHostClick(quiz.id)}>Грати</p>
                <p>Р</p>
            </div>

        </div>
    )
}
export default Quiz
