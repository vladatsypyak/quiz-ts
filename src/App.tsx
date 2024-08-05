import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { Routes, Route } from 'react-router-dom';
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/signin"} element={<Login/>}/>
                <Route path={"/"} element={<Main/>}/>

            </Routes>
        </div>
    );

}

export default App;
