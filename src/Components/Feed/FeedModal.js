import React from "react";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import styles from "./FeeedModal.module.css";
import { PHOTO_GET } from "../../api";

function FeedModal({ photo, setModalPhoto }){
  const { data , error, loading, request } = useXMLHttpRequest();

  React.useEffect(function(){
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutSideClick(event){
    if(event.target === event.currentTarget){
      setModalPhoto(null);
    };
  };

  return (
    <div className={styles.modal} onClick={handleOutSideClick}>
      {error && <Error error={error}/>}
      {loading && <Loading/>}
      {data && <PhotoContent data={data}/>}
    </div>
  );
};

export default FeedModal;