import React, {useEffect, useState} from "react";
import s from "./home.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Header from "../Header/Header";
import quizzesSlice, {fetchQuizzes} from "../../redux/slices/quizzesSlice";


// src/redux/hooks.ts
import { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch } from "../../redux/store";
import UserQuizzes from "./UserQuizes/UserQuizzes";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home = () => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const navigate = useNavigate()
    const quizzes = useSelector((store: RootState) => store.quizzesSlice.quizzes)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchQuizzes());



    }, [])
    console.log(quizzes)
    return (
        <div className={s.home}>
           <UserQuizzes quizzes={quizzes}/>
        </div>
    )
}
export default Home
