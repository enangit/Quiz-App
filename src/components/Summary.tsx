import React from 'react';
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

type SummaryProps = {
    userAnswers: (string | null)[]
}

const Summary: React.FunctionComponent<SummaryProps> = ({ userAnswers }) => {
    const nullAns = [];
    const wrongAns = [];
    const rightAns = [];

    userAnswers.map((ans, index) => {
        if (ans === null) {
            nullAns.push(ans);
        } else if (ans === QUESTIONS[index].answers[0]) {
            rightAns.push(ans);
        } else {
            wrongAns.push(ans);
        }
    });
    return (
        <div
            className='summary'
            id='summary'
        >
            <img
                src={quizCompleteImg}
                alt="Quiz Complete Image"
            />

            <h4>Congratulations you've completed the quiz!</h4>

            <div
                className="summary-stats"
                id='summary-stats'
            >
                <p>
                    <span
                        className="number"
                    >
                        {((nullAns.length / 7) * 100).toFixed(0)}%
                    </span>

                    <span
                        className="text"
                    >
                        Skipped Questions!
                    </span>
                </p>

                <p>
                    <span
                        className="number"
                    >
                        {((rightAns.length / 7) * 100).toFixed(0)}%
                    </span>

                    <span
                        className="text"
                    >
                        Answered Correctly!
                    </span>
                </p>

                <p>
                    <span
                        className="number"
                    >
                        {((nullAns.length / 7) * 100).toFixed(0)}%
                    </span>

                    <span
                        className="text"
                    >
                        Answered Incorrectly!
                    </span>
                </p>
            </div>

            <ol>
                {
                    userAnswers.map((answer, index) => {
                        let answerClasses = 'user-answer';
                        let answerText;
                        if (answer === null) {
                            answerClasses += " skipped";
                        } else if (answer === QUESTIONS[index].answers[0]) {
                            answerText = <p>&#10003; {answer}</p>;
                            answerClasses += " correct";
                        } else {
                            answerText = <p>&#120; {answer}</p>;
                            answerClasses += " wrong";
                        }

                        return (
                            <li key={index}>
                                <h3>{index + 1}</h3>
                                <p className="question">
                                    {QUESTIONS[index].text}
                                </p>
                                <p className={answerClasses}>
                                    {answer === null ? "No answer!" : answerText}
                                </p>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
}

export default Summary
