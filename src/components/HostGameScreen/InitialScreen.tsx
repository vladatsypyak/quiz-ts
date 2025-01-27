import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import s from "./quizTemplate.module.scss"
import {useParams} from "react-router-dom";

import {doc, onSnapshot, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase"

// @ts-ignore
 interface Player {
    name: string;
    joinedAt: Date;
}
type GameData = {
    quizId: string,
    players: Player[],
    gameCode: string
}
const InitialScreen = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<GameData | null>(null);

    useEffect(() => {
        const getGameInfo = async () => {
            if (!gameId) return;

            try {
                const gameRef = doc(db, "games", gameId);

                const unsubscribe = onSnapshot(gameRef, (gameSnapshot) => {
                    if (gameSnapshot.exists()) {
                        const gameData = gameSnapshot.data() as GameData;
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
            {gameData ? (
                <>
                    <p>Game Code: {gameData.gameCode}</p>
                    <button>Start Game</button>
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

export default InitialScreen
