import "./Register.css";
import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import useFormAndValidation from "../../../utils/useFormAndValidation";
import logo from "../../../images/logo.svg";

const Register = ({ onRegister, isSending, registerationError }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.email && values.password) {
      onRegister(values.email, values.password);
    }
    return;
  };

  return (
    <section className="authenticate">
      <img className="authenticate__logo" src={logo} alt="logo"></img>

      <form
        name="login"
        action="#"
        className="authenticate__form"
        onSubmit={handleSubmit}
      >
        <div className="authenticate__form-container">
          <h3 className="authenticate__title">Sign Up</h3>
          <div className="authenticate__input-container">
            <div className="authenticate__input-wrap">
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className={`authenticate__input ${
                  errors.email ? "authenticate__input_type_error" : ""
                }`}
                value={values.email || ""}
                onChange={handleChange}
              ></input>

              <span className="authenticate__error">{errors.email}</span>
            </div>

            <div className="authenticate__input-wrap">
              <input
                required
                minLength="6"
                maxLength="30"
                name="password"
                type="password"
                placeholder="password"
                className={`authenticate__input ${
                  errors.password ? "authenticate__input_type_error" : ""
                }`}
                value={values.password || ""}
                onChange={handleChange}
              ></input>

              <span className="authenticate__error">{errors.password}</span>
            </div>

            <div className="authenticate__submit-wrap">
              <button
                className={`authenticate__submit ${
                  !isValid ? "authenticate__submit_inactive" : ""
                }`}
                type="submit"
              >
                {isSending ? "Logging, please wait..." : "Log in"}
              </button>

              <span className="authenticate__error authenticate__error_type_submit">
                {registerationError}
              </span>
            </div>

            <div className="authenticate__link-wrap">
              <label className="authenticate__link-label">
                Don’t have an account?
              </label>
              <Link className="authenticate__link" to="/login">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default withRouter(Register);
