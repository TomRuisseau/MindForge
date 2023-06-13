import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function TeacherMenu() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='bg-white rounded-circle m-5' style={{ width: "500px" }}>
            <Clock value={value} size={500} />
        </div>
    );
}

export default TeacherMenu;