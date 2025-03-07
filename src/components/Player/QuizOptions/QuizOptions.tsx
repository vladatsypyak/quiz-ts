import {QuizType} from "../../../redux/slices/quizzesSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./quizOptions.module.scss"

const QuizOptions = ({quiz, currentQuestion, onSelectAnswer, isAnswered}: { quiz: QuizType | null, currentQuestion: number, onSelectAnswer: any, isAnswered: any }) => {


    return (
        <div className={s.options}>
            {
                quiz?.questions[currentQuestion]?.options?.map((option, index) => {
                    const isCorrect = option.isCorrect
                    const isAnsweredStyle = isAnswered.isAnswered && isAnswered.index === index ? s.isAnswered : ""
                    return <div className={`${s.option} ${isAnsweredStyle}`}>
                        <p onClick={()=>onSelectAnswer(index, isCorrect )}>{option.text}</p>
                    </div>
                })
            }
        </div>
    )

}
export default QuizOptions
