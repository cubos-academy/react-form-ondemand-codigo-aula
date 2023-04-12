import { ChangeEvent, FormEvent, useState } from "react";
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

const defaultForm = {
  name: "",
  email: "",
  age: 0,
  password: "",
};

function App() {
  const [form, setForm] = useState({ ...defaultForm });
  const [selectCourses, setSelectCourses] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [radioPeriod, setRadioPeriod] = useState("morning");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSelectCourse(event: ChangeEvent<HTMLSelectElement>) {
    const currentSelectedCourse = allCoursesOptions.find(
      (course) => course.id === parseInt(event.target.value)
    );

    if (!currentSelectedCourse) {
      setSelectCourses(null);
      return;
    }

    setSelectCourses(currentSelectedCourse);
  }

  function handleSelectRadio(event: ChangeEvent<HTMLInputElement>) {
    setRadioPeriod(event.target.value);
  }

  function handleFillForm(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setErrorMessage("");

    const entriesForm = Object.entries(form);

    entriesForm.forEach((item) => {
      if (!item[1]) {
        setErrorMessage(`Preencha o campo ${item[0]}`);
        return;
      }
    });

    if (!acceptTerms) {
      setErrorMessage("Você precisa aceitar os termos!");
      return;
    }

    if (!selectCourses) {
      setErrorMessage("Você não selecionou um curso");
      return;
    }

    const data = {
      ...form,
      course: selectCourses,
      period: radioPeriod,
      terms: acceptTerms,
    };

    console.log(data);
  }

  function handleReset() {
    setForm({ ...defaultForm });
    setSelectCourses(null);
    setRadioPeriod("morning");
    setAcceptTerms(false);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Digite seu nome"
          value={form.name}
          onChange={handleFillForm}
        />

        <input
          name="email"
          type="text"
          placeholder="Digite seu e-mail"
          value={form.email}
          onChange={handleFillForm}
        />

        <input
          name="age"
          type="number"
          placeholder="Digite sua idade"
          value={form.age}
          onChange={handleFillForm}
        />

        <select id="courses" onChange={handleSelectCourse}>
          <option value="">Selecione um curso</option>
          {allCoursesOptions.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          value={form.password}
          onChange={handleFillForm}
        />

        <div className="terms">
          <span>{!showPassword ? "Mostrar" : "Ocultar"} senha</span>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </div>

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

        <div className="terms">
          <span>Aceita os termos de uso? </span>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
        </div>

        <button>Salvar</button>
        <button type="button" onClick={handleReset}>
          Limpar
        </button>

        {errorMessage && <strong>{errorMessage}</strong>}
      </form>
    </div>
  );
}

export default App;
