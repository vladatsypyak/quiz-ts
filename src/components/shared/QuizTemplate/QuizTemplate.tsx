import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./quizTemplate.module.scss"
import Option from "../../CreateQuiz/Option/Option";


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
    question: string,
    options: Option[]
}



// @ts-ignore
const QuizTemplate = ({initialQuizData, initialTitle, storeQuizData} ) => {

    const [quizData, setQuizData] = useState(initialQuizData || [])
    const [title, setTitle] = useState(initialTitle)

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
}

function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    setTitle(e.target.value)
}

function handleCopyClick(index: number) {
    const copiedQuestion = structuredClone(quizData[index])
    const newQuizData = [...quizData]
    newQuizData.splice(index + 1, 0, copiedQuestion)
    setQuizData(newQuizData)
}

const handleAddQuestionBtn = (e: any) => {
    e.preventDefault()
    const newQuizData = [...quizData, {
        question: "",
        options: [{text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}, {text: "", image: ""}]
    }]
    setQuizData(newQuizData)
}
    console.log(quizData)
    return (
        <form onSubmit={(e)=>storeQuizData(e, quizData, title)} className={s.container}>

            <div className={s.title_wrap}>
                <p className={s.title}>Назва</p>
                <input onChange={handleTitleChange} placeholder={"Назва квізу"} type="text" value={title}/>
            </div>

            {quizData.map((el: any) => {
                console.log(el)
                const index = quizData.indexOf(el)
                return <div className={s.question_section}>
                    <p className={s.number}>{index + 1}</p>
                    <div className={s.question_wrap}>
                        <input value={el.question || ""} onChange={(e) => handleQuestionChange(e, index)} className={s.question} type="text"/>
                        <div className={s.options_wrap}>
                            {el?.options.map((option : any) => {
                                return <div className={s.option}>
                                    <Option handleOptionChange={handleOptionChange}
                                           value={option.text}
                                            image={option.image}
                                            optionIndex={el.options.indexOf(option)}
                                            index={index}/>
                                </div>
                            })}
                        </div>

                    </div>
                    <div className={s.question_buttons}>
                        <button onClick={()=>handleCopyClick(index)}>c</button>
                        <button>d</button>
                    </div>
                </div>
            })}

            <button onClick={handleAddQuestionBtn}>+</button>


            <button type={"submit"}>save</button>

        </form>
    )
}
export default QuizTemplate
