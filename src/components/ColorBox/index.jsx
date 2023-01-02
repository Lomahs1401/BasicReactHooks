import React, { useState } from 'react';
import './ColorBox.scss';

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue']
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];    
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });

    function handleBoxClick() {
        // get random color --> set color
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div 
            className='color-box' 
            style={{backgroundColor: color, display: 'inline-block', width: 200, height: 200}}
            onClick={handleBoxClick}/>
    );
}

export default ColorBox;