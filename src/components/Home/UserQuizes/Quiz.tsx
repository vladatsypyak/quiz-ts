import React, {useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {QuizType} from "../../../redux/slices/quizzesSlice";
import {db} from "../../../firebase";
import {addDoc, doc, setDoc, collection} from "firebase/firestore";
import {GameData} from "../../HostGameScreen/PlayersWaitingScreen";


const Quiz = ({quiz}: { quiz: QuizType }) => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()
    console.log(quiz)

    function onQuizClick() {
        navigate(`/fullQuiz/${quiz.id}`)
    }

    const onHostClick = async (quizId: string) => {
        const gameCode = Math.random().toString(36).slice(2, 7).toUpperCase();
        try {
            const gameRef = await addDoc(collection(db, "games"), {
                quizId: quizId,
                gameCode: gameCode,
                status: "waiting",
                players: [],
                results: [],
                currentQuestion: 0,
                createdAt: new Date(),
                playerStats: [],
                playersAnswered: 0
            } as GameData);

            console.log("Game code for players to join:", gameCode);
            navigate(`/host/lobby/${gameRef.id}`)
        } catch (error) {
            console.error("Error starting the game:", error);
        }

    };
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
