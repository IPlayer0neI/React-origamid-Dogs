import React from "react";
import styles from "./LoginCreate";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import Error from "../Helper/Error";
import Button from "../Forms/Button";
import Head from "../Helper/Head";

function LoginCreate(){
  const username = useForm();
  const email = useForm();
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);
  const {loading, error, request} = useXMLHttpRequest();

  function handleSubmit(event){
    event.preventDefault();
    
    const { url, options} = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    });

    request(url, options, function(response){
        userLogin(username.value, password.value);
    });
  };

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" description="Home do site de Dogs, com o feed de fotos"/>
      <h1 className="title">Cadastra-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username}/>
        <Input label="Email" type="email" name="email" {...email}/>
        <Input label="Password" type="password" name="password" {...password}/>
        {loading? <Button disabled>Carregando</Button>: <Button>Entar</Button>}
        <Error error={error}/>
      </form>
    </section>
  )
};

export default LoginCreate;