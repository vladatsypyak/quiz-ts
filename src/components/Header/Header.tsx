import React from "react";
import {Link} from "react-router-dom";
import s from "./header.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import { getAuth, signOut } from "firebase/auth";

function Header() {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const auth = getAuth();

    const onLogoutClick = () => {
        signOut(auth).then(() => {
            console.log("Signed out")
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <header className={s.header}>
            <div className={`wrapper ${s.container}`}>
                <p>лого</p>

                <div className={s.icons}>
                    {user ? <Link to={"/home"}>home</Link> : null}

                    {user ? <button onClick={onLogoutClick}>вийти</button> : <Link to={"/signup"}>Ввійти</Link>}
                </div>

            </div>
        </header>
    );
}

export default Header;
