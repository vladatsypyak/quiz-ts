import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import s from "./quizTemplate.module.scss"
import {useParams} from "react-router-dom";
import {fetchQuizById} from "../../redux/slices/quizzesSlice";
import {doc, DocumentData, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {GameData} from "./PlayersWaitingScreen";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";


const Game = () => {
    const {gameId} = useParams()
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)

    console.log(gameId)
    const [roundNumber, setRoundNumber] = useState(0)

    // const [quiz, setQuiz] = useState<DocumentData | null>(null)
    const [gameData, setGameData] = useState<GameData | null>(null)

    useEffect(() => {
        const getGameInfo = async () => {
            if (!gameId) return;

            try {
                const gameRef = doc(db, "games", gameId);

                const unsubscribe = onSnapshot(gameRef, (gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
                        console.log(gameData.players)
                        if (!Array.isArray(gameData.players)) {
                            gameData.players = [];
                        }
                        setGameData(gameData);
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



    return (
        <div>
            {quiz && <div>
                <p>{quiz.questions[roundNumber].question}</p>
                {quiz.questions[roundNumber].options.map((option: any) => {
                    return (
                        <div>
                            <p>{option.text}</p>
                            <img src={option.image} alt=""/>
                        </div>
                    )
                })}
            </div>}
            {gameData && <p>Players: {gameData.players.map(player => <p>{player.name}</p>)}</p>
            }

            <button onClick={() => setRoundNumber(roundNumber + 1)}>next</button>
        </div>

    )
}
export default Game
