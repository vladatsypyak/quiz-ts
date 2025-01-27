import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./quizTemplate.module.scss"
import {useParams} from "react-router-dom";



// @ts-ignore
const InitialScreen = ( ) => {
    const { gameCode } = useParams();

    return (
        <div>
            <p>{gameCode}</p>
            <button>start</button>
        </div>

    )
}
export default InitialScreen
