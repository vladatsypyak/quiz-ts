import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./quizTemplate.module.scss"



// @ts-ignore
const InitialScreen = (code, quizData ) => {


    return (
        <div>
            <p>{code}</p>
            <button>start</button>
        </div>

    )
}
export default InitialScreen
