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
  const [radioPeriod, setRadioPeriod] = useState("morning");

  function handleSelectCourse(event: ChangeEvent<HTMLSelectElement>) {
    const currentSelectedCourse = allCoursesOptions.find(
      (course) => course.id === parseInt(event.target.value)
    );

    if (!currentSelectedCourse) return;

    setSelectCourses(currentSelectedCourse);
  }

  function handleSelectRadio(event: ChangeEvent<HTMLInputElement>) {
    setRadioPeriod(event.target.value);
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

      <h2>{radioPeriod}</h2>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="morning"
            checked={radioPeriod === "morning"}
            onChange={handleSelectRadio}
          />
          Manhã
        </label>

        <label>
          <input
            type="radio"
            value="afternoon"
            checked={radioPeriod === "afternoon"}
            onChange={handleSelectRadio}
          />
          Tarde
        </label>

        <label>
          <input
            type="radio"
            value="night"
            checked={radioPeriod === "night"}
            onChange={handleSelectRadio}
          />
          Noite
        </label>
      </div>
    </div>
  );
}

export default App;
