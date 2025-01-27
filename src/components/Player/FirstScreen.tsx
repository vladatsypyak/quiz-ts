import React, {useState} from "react";
import {doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase"

const FirstScreen = () => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")

    const joinGame = async (gameCode: string, playerName: string): Promise<void> => {
        try {
            // Query the "games" collection to find the game document by gameCode
            const gamesRef = collection(db, "games"); // Reference to the "games" collection
            const q = query(gamesRef, where("gameCode", "==", gameCode)); // Query for gameCode match

            // Fetch the results of the query
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.error("No active game found with the provided game code.");
                return;
            }

            // There should be only one document in the result if gameCode is unique
            const gameDoc = querySnapshot.docs[0];
            const gameData = gameDoc.data();

            // Ensure the game is in "waiting" status before allowing players to join
            if (gameData?.status !== "waiting") {
                console.error("This game is not accepting players anymore.");
                return;
            }

            // Prepare the player data
            const player = {
                name: playerName,
                joinedAt: new Date(),
            };

            // Add the player to the "players" array in the game document
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
            <input onChange={(e) => setCode(e.target.value)} type="text"/>
            <input onChange={(e) => setName(e.target.value)} type="text"/>

            <button onClick={()=>joinGame(code, name)}>Enter</button>
        </div>
    )
}
export default FirstScreen
