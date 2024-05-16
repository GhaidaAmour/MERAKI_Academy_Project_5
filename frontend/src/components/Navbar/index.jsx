import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { setLogout } from "../../service/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";



function Navbar() {
  //const [isAdmin, setIsAdmin] = useState();
  const dispatch = useDispatch();
  /*const { isLoggedIn, token, role } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth,
      role: state.role,
    };
    setIsAdmin(state.auth.role);
  });*/
  const { t, i18n } = useTranslation();
  const [searchItem, setSearchItem] = useState('');

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1787e0" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <NavLink to="/" className="navbar-brand mr-auto">
            <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/whitelogowithdotcom.png" alt="Logo" />
          </NavLink>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder={t('Search')}
            aria-label="Search"
            style={{ width: "250px" }}
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </form>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">{t('Login')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">{t('Register')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link">{t('Contact Us')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/allClinics" className="nav-link">{t('Clinics')}</NavLink>
            </li>
          </ul>
        </div>
        <h1>{t("Welcome to React")}</h1>
        <div>
          <button onClick={() => changeLanguage('en')}>en</button>
          <button onClick={() => changeLanguage('ar')}>ar</button>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
