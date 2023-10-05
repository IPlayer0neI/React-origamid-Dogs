import React from "react";
import styles from "./LoginPasswordReset";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";
import Error from "../Helper/Error";
import { PASSWORD_RESET } from "../../api";

function LoginPassworReset(){
  const password = useForm();
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const { data, loading, error, request } = useXMLHttpRequest();
  const navigate = useNavigate();

  React.useEffect(function(){
    const params = URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if(key){
      setKey(key);
    };
    if(login){
      setLogin(login);
    };
  }, []);

  function handleSubmit(event){
    event.preventDefault();
    
    const {url ,options } = PASSWORD_RESET({
      key: key,
      login: login,
      password: password.value
    });
    request(url, options, function(req){
      if(req.status == 200){
        navigate("/login");
      };
    });
  };

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" description="Home do site de Dogs, com o feed de fotos"/>
      <h1 className="title">Resete a Senha</h1>
        <form onSubmit={handleSubmit}>
          <Input 
            label="Nova Senha" 
            type="password" 
            name="password"
            {...password}
          />
          {
            loading ? 
              <Button disabled>Resetando...</Button>:
              <Button>Resetar</Button>
          }
        </form>
      <Error error={error}/>
    </section>
  );
};

export default LoginPassworReset;