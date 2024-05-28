import React, { useCallback, useRef, useState } from 'react';
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from '../questions';
import Answers from './Answers';
import Question from './Question';


const Quiz: React.FC = () => {

    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    // QUESTIONS.sort(() => Math.random() - 0.5);

    const isQuizCompleted = userAnswers.length === QUESTIONS.length;


    const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
        setAnswerState("answered");
        setUserAnswers(prevAns => {
            return [
                ...prevAns,
                selectedAnswer,
            ]
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }

            setTimeout(() => {
                setAnswerState("");
            }, 2000);
        }, 1000);

    }, [activeQuestionIndex]);



    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);


    if (isQuizCompleted) {
        return <div className='summary' id='summary'>
            <img src={quizCompleteImg} alt="Quiz Complete Image" />
            <h4>Congratulations you've completed the quiz!</h4>
        </div>;
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
                    handleSkipAnswer={handleSkipAnswer}
                    timeout={10000}
                    questionText={QUESTIONS[activeQuestionIndex].text}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    userAnswers={userAnswers}
                    answerState={answerState}
                    handleSelectAnswer={handleSelectAnswer}
                />


        </div>
        </div >
    )
}

export default Quiz
