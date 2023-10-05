import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import Error from "../Helper/Error";
import styles from "./UserPhotoPost.module.css";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

function UserPhotoPost(){
  const nome = useForm();
  const peso = useForm();
  const idade = useForm();
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useXMLHttpRequest();
  const navigate = useNavigate();

  React.useEffect(function(){
    if(data){
      navigate("/conta");
    };
  }, [data, navigate])

  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token= window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData ,token);
    
    request(url, options);
  };

  function handleImgChange(event){
    setImg({
      preview: URL.createObjectURL(event.target.files[0]), 
      raw: event.target.files[0]
    });
  };

  return (
    <section className={styles.photopost + " animeLeft"}>
      <Head title="Poste sua foto" description="Home do site de Dogs, com o feed de fotos"/>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome}/>
        <Input label="Peso" type="number" name="peso" {...peso}/>
        <Input label="Idade" type="number" name="idade" {...idade}/>
        <input className={styles.img}type="file" name="img" id="img" onChange={handleImgChange}/>
        {loading?<Button disabled>Enviando...</Button>:<Button>Enviar</Button>}
        <Error error={error}/>
      </form>
      {
        img.preview && 
        <div 
          className={styles.preview} 
          style={{backgroundImage: `url(${img.preview})`}}
        >
        </div>
      }
    </section>
  );
};

export default UserPhotoPost;
