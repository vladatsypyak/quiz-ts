import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./createQuiz.module.scss"
import Option from "./Option/Option";
import {collection, addDoc} from "firebase/firestore";
import {db} from '../../firebase';
import {useSelector} from "react-redux";
import {RootState} from '../../redux/store';
import QuizTemplate from "../shared/QuizTemplate/QuizTemplate";




const quizDataInitialSate = [
    {
        question: "",
        options: [{text: "", image: "", isCorrect: false}, {text: "", image: "", isCorrect: false}, {text: "", image: "", isCorrect: false}, {text: "", image: "", isCorrect: false}]
    }
]

const CreateQuiz = () => {
    const user = useSelector((store: RootState) => store.userSlice.user)


    const storeQuizData = async (e: FormEvent<HTMLFormElement>, quizData: any, title: any) => {
        e.preventDefault();
        try {

            const docRef = await addDoc(collection(db, "quiz"), {
                    questions : [...quizData],
                    user: user?.id,
                    title: title

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <QuizTemplate initialQuizData={quizDataInitialSate} storeQuizData={storeQuizData} initialTitle={""}/>
    )
}
export default CreateQuiz
