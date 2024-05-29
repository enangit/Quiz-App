import React, { useEffect, useState } from 'react'

type QuestionTimerProps = {
    mode: string
    timeout: number
    onTimeout: (() => void) | null
}
const QuestionTimer: React.FC<QuestionTimerProps> = ({ timeout, onTimeout, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout && onTimeout();
        }, timeout);

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
        <progress max={timeout} value={remainingTime} className={mode}>
        </progress>
    )
}

export default QuestionTimer
