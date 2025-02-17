import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import s from "./quizTemplate.module.scss"
import {useNavigate, useParams} from "react-router-dom";

import {doc, onSnapshot, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase"
import {useDispatch} from "react-redux";
import {QuizType, setCurrentQuiz} from "../../redux/slices/quizzesSlice";

// @ts-ignore
 interface Player {
    name: string;
    joinedAt: Date;
}
export type GameData = {
    status: "waiting" | "active";
    quizId: string,
    players: Player[],
    gameCode: string
}
const PlayersWaitingScreen = () => {
    const dispatch = useDispatch()
    const { gameId } = useParams();
    const navigate = useNavigate()
    const [gameData, setGameData] = useState<GameData | null>(null);

    useEffect(() => {
        const getGameInfo = async () => {
            if (!gameId) return;

            try {
                const gameRef = doc(db, "games", gameId);

                const unsubscribe = onSnapshot(gameRef, async(gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
                        console.log(gameData.players)
                        if (!Array.isArray(gameData.players)) {
                            gameData.players = [];
                        }
                        setGameData(gameData);
                        console.log(gameSnapshot.data().quizId)
                        const quizRef = doc(db, "quiz", gameSnapshot.data().quizId);
                        const quizSnapshot = await getDoc(quizRef);
                        const quizData = { id: quizSnapshot.id, ...quizSnapshot.data() } as QuizType;
                        console.log(quizData)

                        if (quizData) {
                            dispatch(setCurrentQuiz(quizData)) // Зберігаємо в Redux
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

    const onStartGameClick = () => {
        navigate(`/host/game/${gameId}`)
    }

    return (
        <div>
            {gameData ? (
                <>
                    <p>Game Code: {gameData.gameCode}</p>
                    <button onClick={onStartGameClick}>Start Game</button>
                    {gameData.players.map((player, index) => (
                        <p key={index}>{player.name}</p>
                    ))}
                </>
            ) : (
                <p>Loading game data...</p>
            )}
        </div>
    );
};

export default PlayersWaitingScreen
