import React from "react";
import {Link} from "react-router-dom";
import s from "./header.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function Header() {
    const user = useSelector((store: RootState) => store.userSlice.user)


    return (
       <header className={s.header}>
           <div className={`wrapper ${s.container}`}>
               <p>лого</p>

               {user ? <Link to={"/home"}>acc</Link>  : <Link to={"/signup"}>Ввійти</Link>  }

           </div>
       </header>
    );
}

export default Header;
