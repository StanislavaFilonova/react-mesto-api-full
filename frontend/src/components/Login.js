import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(ev) {
        setEmail(ev.target.value);
    }

    function handlePasswordChange(ev) {
        setPassword(ev.target.value);
    }
    // очистка данных формы
    function resetForm() {
        setEmail("");
        setPassword("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.onLogin(email, password, resetForm);
    }

    return (
        <section className="auth">
            <form
                name="form-login"
                className="auth__form"
                onSubmit={handleSubmit}
            >
                <h2 className="auth__welcome-title">Вход</h2>

                <label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="auth__input"
                        maxLength="40"
                        minLength="2"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>

                <label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="auth__input"
                        maxLength="20"
                        minLength="6"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>

                <button type="submit" className="auth__button">
                    Войти
                </button>
            </form>

            <div className="auth__signin">
                <p className="auth__text">
                    Еще не зарегистрированы?
                    <Link to="/signup" className="auth__login-links">
                        {" "}
                        Регистрация
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Login;
