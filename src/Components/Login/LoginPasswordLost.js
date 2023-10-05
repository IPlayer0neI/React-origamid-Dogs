import React from "react";
import styles from "./LoginPasswordLost";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { PASSWORD_LOST } from "../../api";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

function LoginPasswordLost(){
   const login = useForm();
   const { data, loading, error, request } = useXMLHttpRequest();

  function handleSubmit(event){
    event.preventDefault();

    if(login.validate()){
      const {url ,options } = PASSWORD_LOST({
        login: login.value,
        url: "http://localhost:3000/login/resetar"
      });

      request(url, options);
    };
  };

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha?" description="Home do site de Dogs, com o feed de fotos"/>
      <h1 className="title">Perdeu a senha?</h1>
      {
        data ? 
          <p style={{color: "#4c1"}}>{data}</p>:
          <form onSubmit={handleSubmit}>
            <Input 
              label="Email / Usuário" 
              type="text" 
              name="login"
              {...login}
            />
            {
              loading ? 
                <Button disabled>Enviando...</Button>:
                <Button>Enviar Email</Button>
            }
          </form>
      }
      <Error error={error}/>
    </section>
  );
};

export default LoginPasswordLost;