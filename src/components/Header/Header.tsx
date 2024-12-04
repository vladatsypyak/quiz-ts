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

             <div className={s.icons}>
                 {user ? <Link to={"/home"}>home</Link>  : null }

                 {user ? <Link to={"/signout"}>вийти</Link>  : <Link to={"/signup"}>Ввійти</Link>  }
             </div>

           </div>
       </header>
    );
}

export default Header;
