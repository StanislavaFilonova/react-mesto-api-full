import React from "react";
// Импортируем изображение, чтобы оно отображалось на страничке
import vector from "../images/vector.svg";
import { Switch, Route, Link } from "react-router-dom";
/**
 *  Функция: Создание компонента Header, который отвечает за прорисовку логотипа и меню на сайте
 */
function Header(props) {
    return (
        <header className="header">
            <img src={vector} alt="Логотип сервиса" className="header__logo" />
            <Switch>
                <Route exact path="/signin">
                    <Link to="/signup" className="nav-menu__link">
                        Регистрация
                    </Link>
                </Route>
                <Route exact path="/signup">
                    <Link to="/signin" className="nav-menu__link">
                        Войти
                    </Link>
                </Route>
                <Route exact path="/home">
                    <div className="nav-menu">
                        <p className="nav-menu__text">{props.email}</p>
                        <Link
                            to="/signin"
                            className="nav-menu__link"
                            onClick={props.onSignOut}
                        >
                            Выйти
                        </Link>
                    </div>
                </Route>
            </Switch>
        </header>
    );
}
// Экспорт компонента, чтобы потом можно было с ним работать
export default Header;
