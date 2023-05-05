import React from "react";
import "./student.css";

const NewUpdatedForm = (props) => {
  const { students, setStudents, isOpen, togglePopup, tempData, setTempData } =
    props;

  const handleNameInputChange = (e) => {
    setTempData({ ...tempData, name: e.target.value });
  };
  const handleGenderInputChange = (e) => {
    setTempData({ ...tempData, gender: e.target.value });
  };
  const handlePhysicsInputChange = (e) => {
    setTempData({ ...tempData, physics: parseFloat(e.target.value) });
  };
  const handleMathsInputChange = (e) => {
    setTempData({ ...tempData, maths: parseFloat(e.target.value) });
  };
  const handleEnglishInputChange = (e) => {
    setTempData({ ...tempData, english: parseFloat(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    togglePopup();

    const avg_mark = (tempData.physics + tempData.english + tempData.maths) / 3;
    const updatedData = {
      ...tempData,
      avg_mark: avg_mark.toFixed(2),
      result: avg_mark >= 50 ? "PASS" : "FAIL",
    };
    const studentIndex = students.findIndex(
      (student) => student.name === tempData.name
    );

    if (studentIndex === -1) {
      setStudents([...students, updatedData]);
    } else {
      students[studentIndex] = updatedData;
      let clone = JSON.parse(JSON.stringify(students));  //!deep copy
      console.log(clone[studentIndex]);

      setStudents(clone);
    }
  };

  return (
    <div>
      {isOpen ? (
        <div className="popupBox" id="popupBox">
          <form onSubmit={handleSubmit}>
            <h2 className="heading">Add New/Update Student Details</h2>
            <label htmlFor="name"> Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              className="text"
              value={tempData.name}
              onChange={handleNameInputChange}
              placeholder="Your name here"
              required
            />
            <label htmlFor="gender">Gender :</label>

            <select
              name="gender"
              id="gender"
              onChange={handleGenderInputChange}
              value={tempData.gender}
              className="text"
              required
            >
              <option>select</option>
              <option value="Female" >
                Female
              </option>
              <option value="Male">
                Male
              </option>
            </select>

            <label htmlFor="physics">Physics :</label>
            <input
              type="number"
              id="physics"
              className="marks"
              placeholder="Physics marks"
              name="physics"
              value={tempData.physics}
              onChange={handlePhysicsInputChange}
              required
            />
            <label htmlFor="maths">Maths :</label>
            <input
              type="number"
              id="maths"
              className="marks"
              placeholder="Maths marks"
              name="maths"
              value={tempData.maths}
              onChange={handleMathsInputChange}
              required
            />
            <label htmlFor="english">English :</label>
            <input
              type="number"
              id="english"
              className="marks"
              placeholder="English marks"
              name="english"
              value={tempData.english}
              onChange={handleEnglishInputChange}
              required
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default NewUpdatedForm;
