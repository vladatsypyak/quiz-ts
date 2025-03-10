import React, {useEffect, useState} from "react";
import {updateDoc, doc, onSnapshot, getDoc} from "firebase/firestore";
import {db} from "../../firebase"
import {useParams} from "react-router-dom";
import {GameData} from "../HostGameScreen/PlayersWaitingScreen/PlayersWaitingScreen";
import QuizOptions from "./QuizOptions/QuizOptions";
import {QuizType} from "../../redux/slices/quizzesSlice";
import s from "./inGameScreen.module.scss"
const InGameScreen = () => {

    const {gameId} = useParams()

    const [gameData, setGameData] = useState<GameData | null>(null)
    const [quizData, setQuizData] = useState<QuizType | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [isAnswered, setIsAnswered] = useState({isAnswered: false, index: 0})


    const playerName = sessionStorage.getItem("playerName")
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
                        if (gameData.playersAnswered === 0) {
                            setIsAnswered({isAnswered: false, index: 0})
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

    const onSelectAnswer = async (optionIndex: number, isCorrect: Boolean) => {
        if (!gameId || !playerName || !gameData) return

        const currentQuestion = gameData.currentQuestion || 0
        const newResults = gameData && Array.isArray(gameData.results) ? [...gameData.results] : [];
        if (!newResults[currentQuestion]) {
            newResults[currentQuestion] = {}
        }

        if (!newResults[currentQuestion][optionIndex]) {
            newResults[currentQuestion][optionIndex] = [];
        }
        if(Object.values(newResults[currentQuestion]).some((el: any) => el.includes(playerName))) {
            console.log("already answered")
            return
        }
        newResults[currentQuestion][optionIndex].push(playerName)
        const newPlayerStats = {...gameData.playerStats}
        const newQuestionsStats = gameData.questionsStats ? {...gameData.questionsStats} : {}

        if (!newPlayerStats[playerName]) {
            newPlayerStats[playerName] = {correct: 0}
        }
        if (isCorrect) {
            newPlayerStats[playerName].correct += 1;
            newQuestionsStats[currentQuestion] ?  newQuestionsStats[currentQuestion] += 1 :  newQuestionsStats[currentQuestion] = 1
        }

        const gameRef = doc(db, "games", gameId);
        setIsAnswered({isAnswered: true, index: optionIndex})
        console.log(newQuestionsStats)
        await updateDoc(gameRef, {
            results: newResults,
            playerStats: newPlayerStats,
            playersAnswered: gameData.playersAnswered + 1,
            questionsStats: newQuestionsStats
        })
    }

    return (
        <div>
            {!isActive && <p>waiting for others...</p>}
            {isActive &&
                <div className={s.wrapper}>
                    <QuizOptions onSelectAnswer={onSelectAnswer} quiz={quizData} isAnswered={isAnswered}
                                 currentQuestion={gameData?.currentQuestion || 0}/>
                </div>
            }

        </div>
    )
}
export default InGameScreen
