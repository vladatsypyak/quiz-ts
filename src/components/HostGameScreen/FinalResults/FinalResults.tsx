import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import s from "./finalResults.module.scss";
import Question from "./Question";
import {useParams} from "react-router-dom";
import {fetchGameData, fetchQuiz} from "../../../redux/slices/quizzesSlice";
import {useAppDispatch} from "../../Home/Home";


const FinalResults = () => {
    const currentGameData = useSelector((state: RootState) => state.quizzesSlice.currentGameData)
    const quiz = useSelector((store: RootState) => store.quizzesSlice.currentQuiz)
    const dispatch = useAppDispatch();
    const { gameId } = useParams();

    useEffect(() => {
        if (gameId) {
            dispatch(fetchGameData(gameId));
        }
    }, [dispatch, gameId]);

    useEffect(() => {
        if (currentGameData) {
            dispatch(fetchQuiz(currentGameData.quizId));
        }
    }, [dispatch, currentGameData]);

    const countPercentOfCorrectOptions = (questionIndex: number) => {
        if(!currentGameData?.questionsStats) return 0
       const numberOfCorrect =  currentGameData?.questionsStats[questionIndex] || 0
        console.log(numberOfCorrect)
        const totalAnswers = currentGameData?.players.length || 0
        return numberOfCorrect * 100 / totalAnswers
    }
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Результати</h2>
            <div className={s.flex_wrap}>
                {
                    currentGameData ? <div className={s.players_wrap}>
                        {currentGameData.players.map(player => {
                            return <div className={s.player}>
                                <p>{player.name} : <span>{currentGameData.playerStats[player.name]?.correct} / {quiz?.questions.length}</span></p>
                            </div>
                        })}
                    </div> : null

                }
                {

                    quiz && currentGameData ? <div className={s.questions_wrap}>
                        {quiz?.questions.map((questionData: any, questionIndex: number) => {
                            return <Question  questionData={questionData} questionIndex={questionIndex} countPercentOfCorrectOptions={countPercentOfCorrectOptions} currentGameData={currentGameData}/>
                        })}
                    </div> : null
                }


            </div>

        </div>


    )
}
export default FinalResults
