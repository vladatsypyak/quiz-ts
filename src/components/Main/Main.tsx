import React, {useState} from "react";
import s from "./main.module.scss"
import logo from "../../images/big_logo.png"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Main = () => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()

    function onCreateQuiz() {
        if (!user) {
            navigate("signin")
        } else {
            navigate("/create-quiz")
        }
    }

    return (
        <div className={s.main}>
            <div className={s.image_wrap}>
                <img className={s.image} src={logo} alt="logo"/>
            </div>
            <div className={s.flex_wrap}>
                <button className={`${s.btn} ${s.btn_play}`}>Грати</button>
                <button onClick={onCreateQuiz} className={`${s.btn} ${s.btn_create}`}>Створити
                    квіз
                </button>
            </div>

        </div>
    )
}
export default Main
