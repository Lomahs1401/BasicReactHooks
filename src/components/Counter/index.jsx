import React, { useState, useEffect, useRef } from 'react';

function Counter(props) {
    const [count, setCount] = useState(0);
    const prevCount = useRef(count);

    useEffect(() => {
        prevCount.current = count;
    }, [count]);

    const handleIncreaseClick = () => {
        setCount(x => x + 1);
    }
    
    return (
        <div>
            <p>Previous: {prevCount.current}</p>
            <p>Current: {count}</p>

            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
            </div>        
        </div>
    );
}

export default Counter;