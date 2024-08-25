import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./createQuiz.module.scss"
import Option from "./Option/Option";
import {collection, addDoc} from "firebase/firestore";
import {db} from '../../firebase';


type Option = {
    text: string,
    image: string
}

type HandleOptionChangeParams = {
    index: number;
    optionIndex: number;
    field: keyof Option;
    value: string
}

type Question = {
    index: number,
    question: string,
    options: Option[]
}

const quizDataInitialSate = [
    {
        index: 0,
        question: "",
        options: [{text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}]
    }
]

const CreateQuiz = () => {
    const [quizData, setQuizData] = useState<Question[]>(quizDataInitialSate)
    const [title, setTitle] = useState<string>("")


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

    function handleQuestionChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        const newQuizData = [...quizData];
        newQuizData[index].question = e.target.value
        setQuizData(newQuizData)
        console.log(quizData)
    }

    console.log(quizData)

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    const storeQuizData = async (e: FormEvent<HTMLFormElement>) => {
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
    const handleAddQuestionBtn = (e: any) => {
        e.preventDefault()
        const newQuizData = [...quizData, {
            index: 0,
            question: "",
            options: [{text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}]
        }]
        setQuizData(newQuizData)
    }

    return (
        <form onSubmit={storeQuizData} className={s.container}>

            <div className={s.title_wrap}>
                <p className={s.title}>Назва</p>
                <input onChange={handleTitleChange} placeholder={"Назва квізу"} type="text"/>
            </div>

            {quizData.map(el => {
                return <div className={s.question_section}>
                    <p className={s.number}>{el.index + 1}</p>
                    <div className={s.question_wrap}>
                        <input onChange={(e) => handleQuestionChange(e, el.index)} className={s.question} type="text"/>
                        <div className={s.options_wrap}>
                            {el.options.map(option => {
                                return <div className={s.option}>
                                    <Option handleOptionChange={handleOptionChange}
                                            optionIndex={el.options.indexOf(option)} index={el.index}/>
                                </div>
                            })}
                        </div>

                    </div>
                    <div className={s.question_buttons}>
                        <button>c</button>
                        <button>d</button>
                    </div>
                </div>
            })}

            <button onClick={handleAddQuestionBtn}>+</button>


            <button type={"submit"}>save</button>

        </form>
    )
}
export default CreateQuiz