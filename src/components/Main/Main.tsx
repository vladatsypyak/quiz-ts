import React, {useState} from "react";
import s from "./main.module.scss"

const Main = () => {
    return (
        <div className={s.main}>
            <button>грати</button>
            <button>створити квіз</button>
        </div>
    )
}
export default Main