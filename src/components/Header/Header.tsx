import React from "react";
import {Link} from "react-router-dom";
import s from "./header.module.scss"

function Header() {
    return (
       <header className={s.header}>
           <p>лого</p>
           <Link to={"/signup"}>Ввійти</Link>
       </header>
    );
}

export default Header;
