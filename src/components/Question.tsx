import React from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

type QuestionProps = {
    timeout: number
    answers: string[]
    questionText: string
    answerState: string
    userAnswers: (string | null)[]
    handleSelectAnswer: (ans: string | null) => void
    handleSkipAnswer: () => void
}

const Question: React.FunctionComponent<QuestionProps> = ({
    handleSkipAnswer,
    questionText,
    answers,
    userAnswers,
    handleSelectAnswer,
    answerState,
}: QuestionProps) => {
    return (
        <div
            className="question"
            id="question"
        >
            <QuestionTimer
                onTimeout={handleSkipAnswer}
                timeout={10000} />

            <p>
                {questionText}
            </p>

            <ul
                className='answers'
                id='answers'
            >
                <Answers
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    answers={answers}
                    userAnswers={userAnswers}
                    answerState={answerState}
                    handleSelectAnswer={handleSelectAnswer}
                />

            </ul>
        </div>
    )
}
export default Question
