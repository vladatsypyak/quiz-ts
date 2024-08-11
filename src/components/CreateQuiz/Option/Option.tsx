import React, {useState} from "react";
import s from "./Option.module.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons'


const Option = () => {
    const [isCorrect, setCorrect] = useState(false)
    const crossImg = <FontAwesomeIcon icon={faX} style={{color: "#d21919",}}/>
    const checkImg = <FontAwesomeIcon icon={faCheck} style={{color: "#1eb83d",}}/>
    const btnImage = isCorrect ? checkImg : crossImg
    const onBtnClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setCorrect(!isCorrect)
    }
    return (
        <div className={s.option}>
            <p className={s.number}>1</p>
            <p>i</p>
            <input type="text"/>
            <button onClick={onBtnClick}>{btnImage}</button>
        </div>

    )
}
export default Option