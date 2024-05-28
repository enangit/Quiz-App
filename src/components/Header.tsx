import React from 'react'

import logoImg from '../assets/quiz-logo.png';

const Header: React.FC = () => {
    return (
        <header>
            <img src={logoImg} alt="Logo image." />
            <h1>Quiz Application</h1>
        </header>
    )
}

export default Header
