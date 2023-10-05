import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";

function Header(){
  const { data } =  React.useContext(UserContext);

  return (
    <header className={styles.header}>
        <nav className={"container " + styles.nav}>
          <NavLink 
            className={styles.logo} 
            to="/" 
            aria-label="Dogs"
          >
            <Dogs/>
          </NavLink>
          {data? 
          <NavLink 
            className={styles.login} 
            to="/conta"
            >
              {data.username}
            </NavLink>:
            <NavLink 
              className={styles.login} 
              to="/login"
            >
              Login / Criar
            </NavLink>      
          }
        </nav>
    </header>
  )
};

export default Header;