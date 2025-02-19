import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {doc, onSnapshot, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase"
import {useDispatch} from "react-redux";
import {QuizType, setCurrentQuiz} from "../../redux/slices/quizzesSlice";

export interface Player {
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
            const gameRef = doc(db, "games", gameId);

            try {

                const unsubscribe = onSnapshot(gameRef, async(gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
                        if (!Array.isArray(gameData.players)) {
                            gameData.players = [];
                        }
                        setGameData(gameData);

                        const quizRef = doc(db, "quiz", gameData.quizId);
                        const quizSnapshot = await getDoc(quizRef);


                        if (quizSnapshot.exists()) {
                            const quizData = { id: quizSnapshot.id, ...quizSnapshot.data() } as QuizType;
                            dispatch(setCurrentQuiz(quizData))
                        }
                    } else {
                        console.error("No such game document");
                    }
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching game info:", error);
            }
        };

        getGameInfo();

    }, [gameId]);

    const onStartGameClick = async () => {
        if(!gameId) return
        const gameRef = doc(db, "games", gameId);
        try {
            await updateDoc(gameRef, { status: "active" });

            navigate(`/host/game/${gameId}`);
        } catch (error) {
            console.error("Error starting the game:", error);
        }

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
