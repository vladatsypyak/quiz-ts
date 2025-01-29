import React, {useState} from "react";
import {updateDoc, arrayUnion, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase"

const FirstScreen = () => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")

    const joinGame = async (gameCode: string, playerName: string): Promise<void> => {
        try {
            const gamesRef = collection(db, "games"); // Reference to the "games" collection
            const q = query(gamesRef, where("gameCode", "==", gameCode)); // Query for gameCode match

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.error("No active game found with the provided game code.");
                return;
            }

            const gameDoc = querySnapshot.docs[0];
            const gameData = gameDoc.data();

            if (gameData?.status !== "waiting") {
                console.error("This game is not accepting players anymore.");
                return;
            }

            const player = {
                name: playerName,
                joinedAt: new Date(),
            };

            await updateDoc(gameDoc.ref, {
                players: arrayUnion(player),
            });

            console.log(`Player "${playerName}" successfully joined the game with code "${gameCode}".`);
        } catch (error) {
            console.error("Error joining the game:", error);
        }
    };

    return (
        <div>
            <input placeholder={"Введіть код"} onChange={(e) => setCode(e.target.value)} type="text"/>
            <input  placeholder={"Введіть ім'я"} onChange={(e) => setName(e.target.value)} type="text"/>

            <button onClick={()=>joinGame(code, name)}>Enter</button>
        </div>
    )
}
export default FirstScreen
