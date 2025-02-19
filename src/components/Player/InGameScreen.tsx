import React, {useEffect, useState} from "react";
import {updateDoc, arrayUnion, collection, query, where, getDocs, doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useParams} from "react-router-dom";
import {GameData} from "../HostGameScreen/PlayersWaitingScreen";

const InGameScreen = () => {
    console.log("in game screen")

    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)
    const {gameId} = useParams()

    const [gameData, setGameData] = useState<GameData | null>(null)
    const [isActive, setIsActive] = useState(false)

    const playerName = localStorage.getItem("playerName")
    console.log(playerName)
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

    return (
        <div>
            {!isActive && <p>waiting for others...</p>}
            {isActive && <p>active</p>}

        </div>
    )
}
export default InGameScreen
