import React from 'react';

type DotProps = {
    color?: string;
};

const Dot: React.FC<DotProps> = ({ color = 'black' }) => {
    const dotStyle: React.CSSProperties = {
        width: '16px', // Adjust the size of the dot as needed
        height: '16px',
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
    };

    return <div style={dotStyle}></div>;
};

export default Dot;
