import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {GameData} from "./PlayersWaitingScreen/PlayersWaitingScreen";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {QuizType, setCurrentGameData, setCurrentQuiz} from "../../redux/slices/quizzesSlice";
import QuestionResults from "./QuestionResults";


const Game = () => {
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)

    const [roundNumber, setRoundNumber] = useState(0)

    // const [quiz, setQuiz] = useState<DocumentData | null>(null)
    const [gameData, setGameData] = useState<GameData | null>(null)

    const totalQuestionsNum = quiz?.questions.length || 0

    const [showRoundResults, setShowRoundResults] = useState(false)


    useEffect(() => {
        const getGameInfo = async () => {
            if (!gameId) return;

            try {
                const gameRef = doc(db, "games", gameId);

                const unsubscribe = onSnapshot(gameRef, async (gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
                        console.log(gameData.players)
                        if (!Array.isArray(gameData.players)) {
                            gameData.players = [];
                        }
                        setGameData(gameData);
                        dispatch(setCurrentGameData(gameData))
                        const quizRef = doc(db, "quiz", gameData.quizId);
                        const quizSnapshot = await getDoc(quizRef);


                        if (quizSnapshot.exists()) {
                            const quizData = {id: quizSnapshot.id, ...quizSnapshot.data()} as QuizType;
                            dispatch(setCurrentQuiz(quizData))
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

    const onNextRoundClick = async () => {
        if (roundNumber === totalQuestionsNum - 1) {
            alert("quiz end")
            return
        }
        setShowRoundResults(false)

        setRoundNumber(roundNumber + 1)
        if (!gameId) return
        const gameRef = doc(db, "games", gameId);
        await updateDoc(gameRef, {
            currentQuestion: roundNumber + 1,
            playersAnswered: 0
        })

    }

    const onShowRoundResults = () => {
        setShowRoundResults(true)
    }
    return (
        <div>
            {quiz && !showRoundResults && <div>
                <p>{quiz.questions[roundNumber].question}</p>
                {quiz.questions[roundNumber].options.map((option: any) => {
                    return (
                        <div>
                            <p>{option.text}</p>
                            <img src={option.image} alt=""/>
                        </div>
                    )
                })}
                <button onClick={onShowRoundResults}>next</button>
            </div>}
            {gameData && <p>Players: {gameData.players.map(player => <p>{player.name}</p>)}</p>
            }


            <p>----------------</p>

            {quiz && showRoundResults && <QuestionResults onNextRoundClick={onNextRoundClick} gameData={gameData}/>}


        </div>

    )
}
export default Game
