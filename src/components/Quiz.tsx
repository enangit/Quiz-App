import React, { useCallback, useState } from 'react';
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';


const Quiz: React.FC = () => {

    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

    const activeQuestionIndex = userAnswers.length;
    const isQuizCompleted = userAnswers.length === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
        setUserAnswers(prevAns => {
            return [
                ...prevAns,
                selectedAnswer,
            ]
        })
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (isQuizCompleted) {
        console.log(userAnswers.length, QUESTIONS.length);
        return <Summary userAnswers={userAnswers} />
    }


    return (
        <div
            className='quiz'
            id='quiz'
        >
            <div
                className="question"
                id="question"
            >
                <Question
                    key={activeQuestionIndex}
                    activeQuestionIndex={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    handleSkipAnswer={handleSkipAnswer}
                />


            </div>
        </div >
    )
}

export default Quiz
