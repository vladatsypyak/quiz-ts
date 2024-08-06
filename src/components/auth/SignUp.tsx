import {createUserWithEmailAndPassword} from "firebase/auth";
import React, {useState} from "react";
import {auth} from "../../firebase";
import s from "./auth.module.scss"
import {Link} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");

    function register(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (copyPassword !== password) {
            setError("Passwords didn't match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setError("");
                setEmail("");
                setCopyPassword("");
                setPassword("");
            })
            .catch((error) => {
                let errorMessage = "";
                switch (error.code) {
                    case "auth/weak-password":
                        errorMessage = "Пароль повинен містити більше 6 символів";
                        break;
                    case "auth/email-already-in-use":
                        errorMessage = "Користувач з даним email уже існує";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Некоректний email";
                        break;
                    case "auth/user-disabled":
                        errorMessage = "Аккаунт заблокований";
                        break;
                    default:
                        errorMessage = "Сталася помилка. Спробуйте ще раз";
                        break;
                }
                console.log(error.message)
            });
    }

    return (
        <div>
            <form className={s.form} onSubmit={register}>
                <h2 className={s.title}>Створити аккаунт</h2>
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

                        <input
                            className={s.input}
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className={s.input_wrap}>

                        <p className={s.label}>Повторіть пароль</p>
                        <input
                            className={s.input}
                            placeholder="Please enter your password again"
                            value={copyPassword}
                            onChange={(e) => setCopyPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    {error ? <p style={{color: "red"}}>{error}</p> : ""}

                    <button className={s.submit_btn}>Зареєеструватися</button>
                    <p className={s.text}>Уже маєте аккаунт? <Link to={"/signin"}>Ввійдіть</Link></p>

                </div>
            </form>
        </div>
    );
};

export default SignUp;