import { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
    const COLOR_LIST = ['red', 'green', 'yellow', 'blue', 'green', 'pink', 'gray', 'purple', 'orange', 'aqua'];
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;
    while (currentIndex === newIndex) {
        newIndex = Math.trunc(Math.random() * 10);
    }
    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');

    // Change color after 1 second
    useEffect(() => {
        const colorInterval = setInterval(() => {
            // console.log('First color: ', color);
            // console.log('Change color: ', colorRef.current);
            const newColor = randomColor(colorRef.current);
            setColor(newColor);

            colorRef.current = newColor;
        }, 1000);

        return () => {
            clearInterval(colorInterval);
        }
    }, [])

    return color;
}

export default useMagicColor;