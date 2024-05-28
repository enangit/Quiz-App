import React, { useEffect, useState } from 'react'

type QuestionTimerProps = {
    timeout: number
    onTimeout: () => void
}
const QuestionTimer: React.FC<QuestionTimerProps> = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <progress max={timeout} value={remainingTime} className='question-time'></progress>
    )
}

export default QuestionTimer
