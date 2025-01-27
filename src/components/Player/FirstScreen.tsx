import React, {useState} from "react";
import {doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";
import {db} from "../../firebase"

const FirstScreen = () => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")

    const joinQuiz = async (quizCode: any, playerName: any) => {
        try {
            // Знайти квіз за кодом
            const quizQuery = doc(db, "quizzes", quizCode);
            const quizSnapshot = await getDoc(quizQuery);

            if (quizSnapshot.exists()) {
                // Отримати дані квізу
                const quizData = quizSnapshot.data();


                // Оновити список гравців
                await updateDoc(quizQuery, {
                    players: arrayUnion({
                        name: playerName,
                        joinedAt: new Date(),
                    }),
                });

                console.log(`Player "${playerName}" joined the quiz "${quizData.title}".`);

            } else {
                console.error("No quiz found with the provided code.");
            }
        } catch (error) {
            console.error("Error joining the quiz:", error);
        }
    };

    return (
        <div>
            <input onChange={(e) => setCode(e.target.value)} type="text"/>
            <input onChange={(e) => setName(e.target.value)} type="text"/>

            <button onClick={()=>joinQuiz(code, name)}>Enter</button>
        </div>
    )
}
export default FirstScreen
