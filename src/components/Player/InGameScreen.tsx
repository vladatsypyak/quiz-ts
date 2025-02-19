import React, {useEffect, useState} from "react";
import {updateDoc, arrayUnion, collection, query, where, getDocs, doc, onSnapshot, getDoc} from "firebase/firestore";
import {db} from "../../firebase"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useParams} from "react-router-dom";
import {GameData} from "../HostGameScreen/PlayersWaitingScreen";
import QuizOptions from "./QuizOptions/QuizOptions";
import {QuizType} from "../../redux/slices/quizzesSlice";

const InGameScreen = () => {

    const {gameId} = useParams()

    const [gameData, setGameData] = useState<GameData | null>(null)
    const [quizData, setQuizData] = useState<QuizType| null>(null)
    const [isActive, setIsActive] = useState(false)
    const playerName = localStorage.getItem("playerName")
    useEffect(() => {
        const getGameInfo = async () => {
            if (!gameId) return;

            try {
                const gameRef = doc(db, "games", gameId);

                const unsubscribe = onSnapshot(gameRef, (gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
                        setGameData(gameData);
                        if (gameData.status === "active") {
                            setIsActive(true)
                        }

                    } else {
                        console.error("No such game document!");
                    }
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching game info:", error);
            }
        };

        getGameInfo();

    }, [gameId]);

    useEffect(() => {
        if (!gameData?.quizId) return;

        const quizRef = doc(db, "quiz", gameData.quizId);
        getDoc(quizRef).then((quizSnapshot) => {
            if (quizSnapshot.exists()) {
                setQuizData(quizSnapshot.data() as QuizType);
            }
        });
    }, [gameData]);
    console.log(quizData)

    return (
        <div>
            {!isActive && <p>waiting for others...</p>}
            {isActive &&
                <div>
                    <p>active</p>
                <QuizOptions quiz={quizData}/>
                </div>
            }

        </div>
    )
}
export default InGameScreen
