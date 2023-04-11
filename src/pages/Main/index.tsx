import { ChangeEvent, useState } from "react";
import "./styles.css";

const allCoursesOptions = [
  {
    id: 2,
    name: "Segurança da Informação",
  },
  {
    id: 1,
    name: "TI",
  },

  {
    id: 4,
    name: "Cloud Computing",
  },
  {
    id: 3,
    name: "Engenharia de Software",
  },
];

function App() {
  const [inputName, setInputName] = useState("");
  const [selectCourses, setSelectCourses] = useState({ id: 0, name: "" });

  function handleSelectCourse(event: ChangeEvent<HTMLSelectElement>) {
    const currentSelectedCourse = allCoursesOptions.find(
      (course) => course.id === parseInt(event.target.value)
    );

    if (!currentSelectedCourse) return;

    setSelectCourses(currentSelectedCourse);
  }

  return (
    <div className="App">
      <h1>{inputName}</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={inputName}
        onChange={(event) => setInputName(event.target.value)}
      />

      <select id="courses" onChange={handleSelectCourse}>
        <option value="">Selecione um curso</option>
        {allCoursesOptions.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
