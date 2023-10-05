import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import {ReactComponent as MinhasFotos} from "../../Assets/feed.svg";
import {ReactComponent as Estatisticas} from "../../Assets/estatisticas.svg";
import {ReactComponent as AdicionarFoto} from "../../Assets/adicionar.svg";
import {ReactComponent as Sair} from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

function UserHeaderNav(){
  const mobile = useMedia(640);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { userLogout } = React.useContext(UserContext);

  const { pathname } = useLocation();

  React.useEffect(function(){
    setMobileMenu(false);
  }, [pathname]);

  function addActive({ isActive }){
    return isActive? styles.active: "";
  };

  return (
    <React.Fragment>
      {mobile && 
        <button 
          aria-label="menu" 
          className={
            styles.mobileButton + " " + 
             (mobileMenu ? styles.mobileButtonActive:"")
          }
          onClick={() => setMobileMenu(!mobileMenu)}>
        </button>
      }
      <nav className={
        (mobile ? styles.navMobile: styles.nav) + " " +
        (mobileMenu ? styles.navMobileActive: "")
      }>
        <NavLink className={addActive} to="/conta" end>
          <MinhasFotos/>
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink className={addActive} to="/conta/estatisticas">
          <Estatisticas/>
          {mobile && "Estatíticas"}
        </NavLink>
        <NavLink className={addActive} to="/conta/postar">
          <AdicionarFoto/>
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={() => userLogout()}><Sair/>Sair</button>
    </nav>
    </React.Fragment>
  )
};

export default UserHeaderNav;