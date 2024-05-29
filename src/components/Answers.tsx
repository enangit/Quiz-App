import React, { useRef } from 'react';

type AnswersProps = {
    selectedAnswer: string | null
    answers: string[]
    answerState: string
    handleSelectAnswer: (ans: string | null) => void
}

const Answers: React.FunctionComponent<AnswersProps> = ({ answers, selectedAnswer, answerState, handleSelectAnswer }) => {
    const shuffledAnswers = useRef<string[]>();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    console.log(answerState)

    return (
        shuffledAnswers.current
            .map(answer => {
                const isSelected = selectedAnswer === answer
                let buttonClasses = ''
                if (answerState === "answered" && isSelected) {
                    console.log("got here");
                    buttonClasses = "selected";
                }

                if ((answerState === "correct" || answerState === "wrong") && isSelected) {
                    buttonClasses = answerState
                }

                return (
                    <li
                        className='answer'
                        key={answer}
                    >

                        <button
                            className={buttonClasses}
                            onClick={() => { handleSelectAnswer(answer) }}
                            disabled={answerState !== ""}
                        >
                            {answer}
                        </button>
                    </li>
                )
            })
    )
}

export default Answers
