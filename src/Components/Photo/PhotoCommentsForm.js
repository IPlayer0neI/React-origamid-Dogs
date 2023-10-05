import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

function PhotoCommentsForm({ id, setComments, single }){
  const [comment, setComment] = React.useState("");
  const { error, request } = useXMLHttpRequest();

  function handleSubmit(event){
    event.preventDefault();

    const token= window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, {comment}, token);
    request(url, options, function(req, json){
      if(req.status == 200){
        setComment("");
        setComments((comments) => [...comments, json]);
      };
    });
  };

  return (
    <form className={styles.form + " " + (single?styles.single:"")} onSubmit={handleSubmit} >
      <textarea 
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
        value={comment}
      />
      <button className={styles.button}>
        <Enviar/>
      </button>
      <Error error={error}/>
   </form>
  );
};

export default PhotoCommentsForm;