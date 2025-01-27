import React, {useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {QuizType} from "../../../redux/slices/quizzesSlice";
import {db} from "../../../firebase";
import {addDoc, doc, setDoc, collection} from "firebase/firestore";


const Quiz = ({quiz}: { quiz: QuizType }) => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()
    console.log(quiz)

    function onQuizClick() {
        navigate(`/fullQuiz/${quiz.id}`)
    }

    const onHostClick = async (quizId: string) => {
        const gameCode = Math.random().toString(36).slice(2, 7).toUpperCase(); // Generate a 5-character unique game code
        try {
            // Create a new document in the "games" collection with an auto-generated ID
            const gameRef = await addDoc(collection(db, "games"), {
                quizId: quizId, // Reference the quiz this game is based on
                gameCode: gameCode, // Unique game code for players to join
                status: "waiting", // Game status (waiting for players to join)
                players: [], // Players will be added here
                results: {}, // Store results here after the game ends
                currentQuestion: 1, // Start with the first question
                createdAt: new Date(), // Timestamp for when the game was created
            });

            console.log("Game started with ID:", gameRef.id);
            console.log("Game code for players to join:", gameCode);
            navigate(`/host/initial-screen/${gameRef.id}`)
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
