import React, {useState} from "react";
import s from "./main.module.scss"
import logo from "../../images/big_logo.png"
import {Link} from "react-router-dom";

const Main = () => {

    return (
        <div className={s.main}>
            <div className={s.image_wrap}>
                <img className={s.image} src={logo} alt="logo"/>
            </div>
            <div className={s.flex_wrap}>
                <button className={`${s.btn} ${s.btn_play}`}>Грати</button>
                <button className={`${s.btn} ${s.btn_create}`}><Link to={"/create-quiz"}>Створити квіз</Link></button>
            </div>

        </div>
    )
}
export default Main