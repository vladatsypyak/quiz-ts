import React, {ChangeEvent, useState} from "react";
import s from "./Option.module.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from '@fortawesome/free-solid-svg-icons'
import {faImage} from "@fortawesome/free-regular-svg-icons";

import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import {storage} from "../../../firebase";

type OptionProps = {
    index: number;
    handleOptionChange: any,
    optionIndex: number,
    value: string | null,
    image: string,
    isCorrect: Boolean
}

const Option = ({index, optionIndex, handleOptionChange, value, image, isCorrect}: OptionProps) => {
    // const [isCorrect, setCorrect] = useState(false)
    const crossImg = <FontAwesomeIcon icon={faX} style={{color: "#d21919",}}/>
    const checkImg = <FontAwesomeIcon icon={faCheck} style={{color: "#1eb83d",}}/>
    const btnImage = isCorrect ? checkImg : crossImg

    const [file, setFile] = useState(image);
    function handleTextChange(e: ChangeEvent<HTMLInputElement>, optionIndex: number){
        handleOptionChange({index, optionIndex, field: "text", value: e.target.value})
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            console.log(selectedFile);
            setFile(URL.createObjectURL(selectedFile));
            const storageRef = ref(storage, `images/${selectedFile.name}`);
            uploadBytes(storageRef, selectedFile)
                .then((snapshot) => {

                    return getDownloadURL(snapshot.ref)
                })
                .then((url) => {
                    console.log(url)
                    handleOptionChange({index, optionIndex, field: "image", value: url})

                    console.log("File url:", url);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    }


    const onBtnClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        handleOptionChange({index, optionIndex, field: "isCorrect", value: !isCorrect})
        // setCorrect(!isCorrect)

    }
    return (
        <div className={s.option}>
            <p className={s.number}>{optionIndex + 1}</p>
            <label htmlFor={`img_upload_${index}_${optionIndex}`} className={s.img_upload}>
                {file !== "" ?
                    <img src={file} alt=""/> : <FontAwesomeIcon icon={faImage} style={{color: "#636363",}}/>
                }
                <input onChange={handleImageChange}
                       id={`img_upload_${index}_${optionIndex}`}
                       type="file"
                       accept=".gif,.jpg,.jpeg,.png"/>
            </label>
            <input value={value || ""} onChange={(e)=>handleTextChange(e,optionIndex )}  className={s.text_input} type="text"/>

            <button onClick={onBtnClick}>{btnImage}</button>
        </div>

    )
}
export default Option
