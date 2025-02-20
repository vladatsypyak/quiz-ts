import {QuizType} from "../../../redux/slices/quizzesSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const QuizOptions = ({quiz, currentQuestion}: { quiz: QuizType | null, currentQuestion: number }) => {
    console.log(quiz)

    return (
        <div>
            {
                quiz?.questions[currentQuestion].options.map((option) => {
                    return <p>{option.text}</p>
                })
            }
        </div>
    )

}
export default QuizOptions
