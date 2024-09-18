import { useState } from "react";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import classNames from "classnames";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    status: false,
  });

  const handleValidation = ({ email, password }) => {
    const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordError =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/gm.test(password);
    return {
      emailError: emailError ? "" : "Введіть актуальний email",
      passwordError: passwordError
        ? ""
        : 'Пароль має містити мінімум 8 символів, одну велику та одну малу літеру латинського алфавіту, а також один з символів "!@#$%^&*"',
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = handleValidation(form);
    setForm((prevForm) => ({ ...prevForm, ...validationError }));
    const isSuccess =
      !validationError.passwordError && !validationError.emailError;

    if (isSuccess) {
      setForm({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        status: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [`${name}Error`]: false }));
    setForm((prevData) => ({
      ...prevData,
      status: false,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="is-flex is-align-items-center hero is-fullheight">
        <form onSubmit={handleSubmit} className="column">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                type="text"
                value={form.email || ""}
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className={classNames("input", {
                  "is-danger": form.emailError,
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          {form.emailError && (
            <p className="help is-danger">{form.emailError}</p>
          )}
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                type="password"
                value={form.password || ""}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className={classNames("input", {
                  "is-danger": form.passwordError,
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          {form.passwordError && (
            <p className="width help is-danger">{form.passwordError}</p>
          )}

          <div className="field">
            <div className="control">
              <button className="button is-success">Login</button>
            </div>
          </div>
          {form.status && (
            <div className="message width">
            <p className="message-body">
              Користувача з такими даними не знайдено
            </p>
          </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
