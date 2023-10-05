import React from "react";
import styles from "./PhotoDelete.module.css";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { PHOTO_DELETE } from "../../api";

function PhotoDelete({ id }){
  const { loading, request } = useXMLHttpRequest();

  function handleClick(event){
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if(confirm){
      const token = window.localStorage.getItem(token);
      const { url, options } = PHOTO_DELETE(id, token);
      request(url, options, function(req){
        if(req.status == 200){
          window.location.reload();
        };
      });
    };
  };

  return (
    <React.Fragment>
      {
        loading ?
        <button
          className={styles.delete}
          disabled
        >
          Deletando
        </button>:
        <button 
          onClick={handleClick}
        >
          Deletar
        </button>
      } 
    </React.Fragment>
  );
};

export default PhotoDelete;