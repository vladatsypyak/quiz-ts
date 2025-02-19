import {QuizType} from "../../../redux/slices/quizzesSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const QuizOptions = ({quiz}: { quiz: QuizType | null }) => {
    console.log(quiz)

    return (
        <div></div>
    )

}
export default QuizOptions
