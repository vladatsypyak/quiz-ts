import React, {useState} from "react";
import s from "./createQuiz.module.scss"
import Option from "./Option/Option";
import {collection, addDoc} from "firebase/firestore";
import {db} from '../../firebase';


type Option = {
    text: "sting",
    image: "string"
}

type HandleOptionChangeParams = {
    index: number;
    optionIndex: number;
    field: keyof Option;
    value: string
}


const CreateQuiz = () => {
    const [quizData, setQuizData] = useState([{
        index: 0,
        question: "",
        options: [{text: "", image: ""}]
    }])
    const [title, setTitle] = useState("")


    const handleOptionChange = ({index, optionIndex, field, value}: HandleOptionChangeParams) => {
        const newQuizData = [...quizData];
        const newOptions = [...newQuizData[index].options];
        newOptions[optionIndex] = {
            ...newOptions[optionIndex],
            [field]: value
        };
        newQuizData[index].options = newOptions;
        setQuizData(newQuizData);
    }

    function handleQuestionChange(e: any, index: number) {
        const newQuizData = [...quizData];
        newQuizData[index].question = e.target.value
        setQuizData(newQuizData)
        console.log(quizData)
    }

    function handleTitleChange(e: any) {
        setTitle(e.target.value)
    }

    const storeQuizData = async (e: any) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "quiz"), {
                quizData: {
                    ...quizData,
                    title: title
                },
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <form className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Назва</p>
                <input onChange={handleTitleChange} placeholder={"Назва квізу"} type="text"/>
            </div>
            <div className={s.question_section}>
                <p className={s.number}>1</p>
                <div className={s.question_wrap}>
                    <input onChange={(e) => handleQuestionChange(e, 0)} className={s.question} type="text"/>
                    <div className={s.options_wrap}>
                        <div className={s.option}>
                            <Option handleOptionChange={handleOptionChange} optionIndex={0} index={0}/>
                        </div>
                        <div className={s.option}>
                            <Option handleOptionChange={handleOptionChange} optionIndex={1} index={0}/>
                        </div>
                        <div className={s.option}>
                            <Option handleOptionChange={handleOptionChange} optionIndex={2} index={0}/>
                        </div>
                        <div className={s.option}>
                            <Option handleOptionChange={handleOptionChange} optionIndex={3} index={0}/>
                        </div>
                    </div>
                </div>
                <div className={s.question_buttons}>
                    <button>c</button>
                    <button>d</button>
                </div>
            </div>
            <button>+</button>
            <button onClick={storeQuizData}>save</button>

        </form>
    )
}
export default CreateQuiz