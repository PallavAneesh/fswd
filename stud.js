import React, { useState } from "react";

function StudentManager() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const addStudent = () => {
    if (name === "" || marks === "") {
      alert("Please enter valid data");
      return;
    }

    const newStudent = {
      name: name,
      marks: Number(marks)
    };

    setStudents([...students, newStudent]);
    setName("");
    setMarks("");
  };

  const average =
    students.length > 0
      ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(2)
      : 0;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Manager</h1>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <br /><br />

      <button onClick={addStudent}>Add Student</button>

      <h2>Student List</h2>

      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Average Marks: {average}</h2>

    </div>
  );
}

export default StudentManager;
