import React, {
  useState,
  useEffect,
  forwardRef,
} from "react";
import axios from "axios";

const StudentClass = forwardRef((props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getStudents", {
        email: props.data[0].teacher_email,
      })
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  return (
    <div className=" w-100 d-flex flex-column align-items-center justify-content-center just-color-white" style={{ height: "100vh" }}>
      <div
        className="glass1 hug just-color-white w-50 box-size d-flex flex-column"
        style={{ minHeight: "50vh" }}
      >
        <h1 className="text-center m-3 just-color-yellow">Ma classe</h1>
        <table className="m-5 text-center">
          <thead>
            <tr className="ma-classe-size just-color-yellow">
              <th className="pb-4">Prénom</th>
              <th className="pb-4">HP</th>
              <th className="pb-4">XP</th>
              <th className="pb-4">Mana</th>
            </tr>
          </thead>
          <tbody class="custom-scrollbar log-size" style={{ overflow: "auto" }}>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="w-25">{student.first_name}</td>
                <td className="w-25">{student.hp}</td>
                <td className="w-25">{student.xp}</td>
                <td className="w-25">{student.mana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default StudentClass;
