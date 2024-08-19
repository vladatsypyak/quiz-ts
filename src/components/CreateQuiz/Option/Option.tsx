import React, {ChangeEvent, useState} from "react";
import s from "./Option.module.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons'
import {faImage} from "@fortawesome/free-regular-svg-icons";


// @ts-ignore
const Option = ({index}) => {
    const [isCorrect, setCorrect] = useState(false)
    const crossImg = <FontAwesomeIcon icon={faX} style={{color: "#d21919",}}/>
    const checkImg = <FontAwesomeIcon icon={faCheck} style={{color: "#1eb83d",}}/>
    const btnImage = isCorrect ? checkImg : crossImg

    const [file, setFile] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    const onBtnClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setCorrect(!isCorrect)
    }
    console.log(file)
    return (
        <div className={s.option}>
            <p className={s.number}>{index+1}</p>
            <label htmlFor={`img_upload_${index}`} className={s.img_upload}>
                {file !== "" ?
                    <img src={file} alt=""/> : <FontAwesomeIcon icon={faImage} style={{color: "#636363",}}/>
                }
                <input onChange={handleChange}
                       id={`img_upload_${index}`}
                       type="file"
                       accept=".gif,.jpg,.jpeg,.png"/>
            </label>
            <input className={s.text_input} type="text"/>


            <button onClick={onBtnClick}>{btnImage}</button>
        </div>

    )
}
export default Option