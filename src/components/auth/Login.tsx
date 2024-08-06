import {signInWithEmailAndPassword} from "firebase/auth";
import s from "./auth.module.scss"
import React, {useState} from "react";
import {auth} from "../../firebase";
import {Link} from "react-router-dom";


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function logIn(e: { preventDefault: () => void; }) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setPassword("");
                // localStorage.setItem('testObject', testObject);

            })
            .catch((error) => {
                console.log(error);
                setError("SORRY, COULDN'T FIND YOUR ACCOUNT")
            });
    }

    return (
        <div>
            <form className={s.form}>
                <h2 className={s.title}>Ввійти в аккаунт</h2>
                <div className={s.flex_wrap}>
                    <div className={s.input_wrap}>
                        <p className={s.label}>email</p>
                        <input className={s.input}
                               placeholder="Please enter your email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               type="email"
                        />
                    </div>
                    <div className={s.input_wrap}>
                        <p className={s.label}>Пароль</p>
                        <input className={s.input}
                               placeholder="Please enter your password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               type="password"
                        />

                    </div>
                    {error ? <p style={{color: "red"}}>{error}</p> : ""}

                    <button className={s.submit_btn} onClick={logIn}>Ввійти</button>
                    <p className={s.text}>Не маєте аккаунту? <Link to={"/signup"}>Зареєструйтеся</Link></p>

                </div>
            </form>
        </div>
    );
};

export default SignIn;