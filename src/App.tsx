import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import {Routes, Route} from 'react-router-dom';
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import {setUser} from "./redux/slices/userSlice";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import Home from "./components/Home/Home";
import FullQuiz from "./components/Home/UserQuizes/FullQuiz";
import InitialScreen from "./components/HostGameScreen/InitialScreen";
import FirstScreen from "./components/Player/FirstScreen";
import Game from "./components/HostGameScreen/Game";


const useTypedSelector: TypedUseSelectorHook<any> = useSelector;


function App() {
    const user = useTypedSelector(state => state.userSlice.user)
    const auth = getAuth();
    const dispatch = useDispatch()


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    id: user.uid,
                    email: user.email
                }))
            } else {
                dispatch(setUser(null))

            }
        });
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={`/fullQuiz/:id`} element={<FullQuiz/>}/>

                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/signin"} element={<Login/>}/>
                <Route path={"/create-quiz"} element={<CreateQuiz/>}/>
                <Route path={"/host/initial-screen/:gameId"} element={<InitialScreen/>}/>
                <Route path={"/host/game/:gameId"} element={<Game/>}/>

                <Route path={"/player/firstScreen"} element={<FirstScreen/>}/>


            </Routes>
        </div>
    );

}

export default App;
