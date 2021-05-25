import React from 'react'
import style from './button.module.css'
import { navigate } from 'gatsby'

const Button = function ({ text, bgColor, color, goTo }) {
    return (
        <div
            className={style.button}
            style={{
                backgroundColor: bgColor,
                color: color,
            }}
            onClick={() => navigate(goTo)}
        >
            <p>{text}</p>
        </div>
    )
}

export default Button
