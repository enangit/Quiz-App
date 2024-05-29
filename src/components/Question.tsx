import React, { useState, useCallback } from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import QUESTIONS from '../questions';

type QuestionProps = {
    onSelectAnswer: (ans: string | null) => void
    activeQuestionIndex: number
    handleSkipAnswer: () => void
}

const Question: React.FunctionComponent<QuestionProps> = ({
    onSelectAnswer,
    activeQuestionIndex,
    handleSkipAnswer
}: QuestionProps) => {
    let timer = 10000;
    const [answer, setAnswer] = useState<{ selectedAnswer: string | null, isCorrect: boolean | null }>({
        selectedAnswer: "",
        isCorrect: null
    });

    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = useCallback((ans: string | null) => {
        setAnswer(prev => {
            return {
                ...prev,
                selectedAnswer: ans,
                isCorrect: null,
            }
        });

        setTimeout(() => {
            setAnswer(prev => {
                return {
                    ...prev,
                    selectedAnswer: ans,
                    isCorrect: QUESTIONS[activeQuestionIndex].answers[0] === ans,
                }
            });

            setTimeout(() => {
                onSelectAnswer(ans);
            }, 2000);
        }, 1000);


    }, [activeQuestionIndex, onSelectAnswer]);


    let answerState = "";

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        console.log(answer.selectedAnswer);
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        console.log(answer.selectedAnswer);
        answerState = "answered";
    }

    if (activeQuestionIndex >= QUESTIONS.length) return
    return (
        <div
            className="question"
            id="question"
        >
            <QuestionTimer
                key={timer}
                mode={answerState}
                onTimeout={answer.selectedAnswer === "" ? handleSkipAnswer : null}
                timeout={timer} />

            <p>
                {QUESTIONS[activeQuestionIndex].text}
            </p>

            <ul
                className='answers'
                id='answers'
            >
                <Answers
                    selectedAnswer={answer.selectedAnswer}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    answerState={answerState}
                    handleSelectAnswer={handleSelectAnswer}
                />

            </ul>
        </div>
    )
}
export default Question
