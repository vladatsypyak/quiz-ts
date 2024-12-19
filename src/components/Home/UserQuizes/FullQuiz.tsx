import React, {FormEvent, useEffect, useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {fetchQuizById, QuizType} from "../../../redux/slices/quizzesSlice";
import { useParams } from 'react-router-dom';
import {updateDoc, collection, doc, DocumentData} from "firebase/firestore";
import QuizTemplate from "../../shared/QuizTemplate/QuizTemplate";
import {log} from "util";
import {db} from "../../../firebase";




const FullQuiz = () => {
    const user = useSelector((store: RootState) => store.userSlice.user)
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<DocumentData | null>(null)
    console.log(quiz)
    useEffect(() => {
        const fetchData = async () => {
            if(id) {
                const data = await fetchQuizById(id); // This might return undefined
                if (data) {
                    setQuiz(data);
                } else {
                    console.error("Quiz data is undefined");
                }
            } else {
                console.log("id is undefined")
            }

        };

        fetchData();
    }, [id]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>, quizData: any, title: any) =>{
        e.preventDefault();

        const docRef = doc(collection(db, 'quiz'), id);
        const updated = await updateDoc(docRef,{
            title:title,
            questions : [...quizData],
        } )
        console.log("successfully updated")
    }


    return (
        <div className={""}>
            {
              quiz ?  <QuizTemplate initialQuizData={quiz?.questions} initialTitle={quiz?.title} storeQuizData={onSubmit}/> : null

            }

        </div>
    )
}
export default FullQuiz
