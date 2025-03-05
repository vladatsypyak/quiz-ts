import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {doc, onSnapshot, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase"
import {useDispatch} from "react-redux";
import {QuizType, setCurrentQuiz} from "../../../redux/slices/quizzesSlice";
import s from "./playersWaitingScreen.module.scss"

export interface Player {
    name: string;
    joinedAt: Date;
}
export type GameData = {
    status: "waiting" | "active";
    quizId: string,
    players: Player[],
    gameCode: string,
    currentQuestion: number,
    results: any,
    playerStats: any,
    playersAnswered: number
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

    }, [gameId, gameData]);

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
        <div className={"container"}>
            {gameData ? (
                <div className={s.wrapper}>
                   <div className={s.top_text_wrap}>
                       <p className={s.text}>Код для приєднання: <span>{gameData.gameCode}</span></p>
                       <p className={s.text}>Посилання: <a>https://play/quizler</a></p>
                   </div>
                    <div className={s.picture}>
                        img
                    </div>
                   <div className={s.bottom_wrap}>
                       <div className={s.players_wrap}>
                           <p>Під’єднані гравці: </p>
                           <p>{gameData.players.map((player) => player.name).join(", ")}</p>
                       </div>
                       <button className={s.start_btn} onClick={onStartGameClick}>Почати</button>

                   </div>

                </div>
            ) : (
                <p>Loading game data...</p>
            )}
        </div>
    );
};

export default PlayersWaitingScreen
