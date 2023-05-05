import React, { useState, useEffect, useRef } from "react";
import data from "./students.json";
import "./student.css";

import { AiOutlineEdit } from "react-icons/ai";
import NewUpdatedForm from "./newUpdated";

export default function StudentResult() {
  const heading = [
    "Name",
    "Gender",
    "Physics",
    "Maths",
    "English",
    "Avg_mark",
    "Result",
  ];

  const [students, setStudents] = useState([]);
  const [isFlag, setFlag] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [tempData, setTempData] = useState({
    name: "",
    gender: "",
    physics: "",
    maths: "",
    english: "",
  });
  console.log({ students });

  const refElement = useRef();

  useEffect(() => {
    setStudents(getStudentData());
  }, []);

  const getStudentData = () => {
    const newData = data.map((student) => {
      const avg_mark = (student.physics + student.maths + student.english) / 3;

      return {
        ...student,
        avg_mark: avg_mark.toFixed(2),
        result: avg_mark >= 50 ? "PASS" : "FAIL",
      };
    });

    return newData;
  };

  const clickHandle = () => {
    const studentData = getStudentData();
    const passedStudent = studentData.filter(
      (student) => student.result === "PASS"
    );
    const failedStudent = studentData.filter(
      (student) => student.result === "FAIL"
    );
    console.log(isFlag);
    setStudents(isFlag ? passedStudent : failedStudent);
    setFlag(!isFlag);
  };

  const clickHandleAll = () => {
    setStudents(getStudentData());
  };

  const togglePopup = (student) => {
    setIsOpen(!isOpen);
    setTempData(student);
    isOpen
      ? (refElement.current.style.opacity = 1)
      : (refElement.current.style.opacity = 0);
  };

  return (
    <>
      <h2 className="heading">Student marks</h2>

      <table className="student_data" ref={refElement}>
        <tbody>
          <tr className="table_header">
            {heading.map((headingName, index) => (
              <th key={`student -${index}`} className="col-heading">
                {headingName}
              </th>
            ))}
            <th>Edit</th>
          </tr>
          {students.map((student, idx) => (
            <tr key={`table-row-${idx}`} className="student_row2">
              {heading.map((headingName, index) => {
                return (
                  <>
                    <td key={`col- ${index}`} className="student_col">
                      {student[headingName.toLowerCase()]}
                    </td>
                  </>
                );
              })}
              <td onClick={() => togglePopup(student)}>
                <AiOutlineEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btns">
        <button className="toggle btn" onClick={clickHandle}>
          {isFlag
            ? "click here to see all passed student"
            : " click here to see all failed student"}
        </button>

        <button className="reset btn" onClick={clickHandleAll}>
          Reset
        </button>

        <button className="btn" onClick={() => togglePopup({})}>
          Add Student
        </button>
        <NewUpdatedForm
          setStudents={setStudents}
          students={students}
          isOpen={isOpen}
          togglePopup={togglePopup}
          tempData={tempData}
          setTempData={setTempData}
        />
      </div>
    </>
  );
}
