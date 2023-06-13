import React, { useEffect, useState, useRef } from 'react';
import Clock from 'react-clock';
import axios from 'axios';
import 'react-clock/dist/Clock.css';

function TeacherMenu(props) {
    const [value, setValue] = useState(new Date());
    const [student, setStudent] = useState({});
    const [skin, setSkin] = useState("toutNu");

    const isMountedRef = useRef(false);


    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            axios.post("http://localhost:5000/getRandomStudent", { id: props.id })
                .then((res) => {
                    setStudent(res.data);
                    axios.post("http://localhost:5000/getSkin", { id: res.data.id })
                        .then((res) => {
                            setSkin(res.data);
                        }
                        )
                        .catch((err) => {
                            console.log(err);
                        }
                        );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [props.id]);


    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (

        <>
            <div className="row">
                <div className="col-4">
                    <div className='bg-white rounded-circle m-5' style={{ width: "200px" }}>
                        <Clock value={value} size={200} />
                    </div>

                    <div>
                        <h3 className='text-center'>List de quêtes</h3>
                    </div>
                </div>
                <div className='col-5'>
                    <h1 className='text-center'>Student of the day</h1>
                    <h2 className='text-center'>{student.first_name + " " + student.surname + " : " + student.xp + " xp"}</h2>
                    <img src={`media/skin/${skin}.png`}></img>
                </div>
            </div>
        </>

    );
}

export default TeacherMenu;