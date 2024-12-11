import React, {useEffect, useState} from "react";
import s from "./userQuizes.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {fetchQuizById, QuizType} from "../../../redux/slices/quizzesSlice";
import { useParams } from 'react-router-dom';
import { DocumentData } from "firebase/firestore";
import QuizTemplate from "../../shared/QuizTemplate/QuizTemplate";
import {log} from "util";



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

    return (
        <div className={s.quiz_wrapper}>
            {
              quiz ?  <QuizTemplate initialQuizData={quiz?.questions} initialTitle={quiz?.title} storeQuizData={()=> console.log("hi")}/> : null

            }

        </div>
    )
}
export default FullQuiz
