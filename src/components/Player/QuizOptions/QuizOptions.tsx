import {QuizType} from "../../../redux/slices/quizzesSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const QuizOptions = ({quiz, currentQuestion, onSelectAnswer}: { quiz: QuizType | null, currentQuestion: number, onSelectAnswer: any }) => {


    return (
        <div>
            {
                quiz?.questions[currentQuestion]?.options?.map((option, index) => {
                    const isCorrect = option.isCorrect
                    return <p onClick={()=>onSelectAnswer(index, isCorrect )}>{option.text}</p>
                })
            }
        </div>
    )

}
export default QuizOptions
