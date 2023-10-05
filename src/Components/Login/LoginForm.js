import React from "react";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

function LoginForm(){
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading} =  React.useContext(UserContext);

  function handleSubmit(event){
    event.preventDefault();

    if(username.validate() && password.validate()){
     userLogin(username.value, password.value);
    };
  };

  return (
    <section className="animeLeft">
        <Head title="login" description="Home do site de Dogs, com o feed de fotos"/>
        <h1 className="title">Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input 
            label="usuário" 
            type="text"
            name="username"
            {...username}
          />
          <Input 
            label="senha" 
            type="password"
            name="password"
            {...password}
          />
          {loading? <Button disabled>Carregando</Button>: <Button>Entar</Button>}
          <Error error={error && "Dados incorretos"}/>
        </form>
        <Link className={styles.perdeu} to="/login/predeu">Perdeu a senha</Link>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>Cadastra-se</h2>
        <p>Ainda não possui conta</p>
          <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
        </div>
    </section>
  )
};

export default LoginForm;