import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useClock from '../../hooks/useClock';

function Clock() {
    const { timeString } = useClock();

    return (
        <div>
            <p style={{fontSize: '42px'}}>{timeString}</p>
        </div>
    );
}

export default Clock;