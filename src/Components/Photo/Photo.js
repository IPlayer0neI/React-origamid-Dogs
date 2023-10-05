import React from "react";
import { useParams } from "react-router-dom";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { PHOTO_GET } from "../../api";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

function Photo(){
  const { id } = useParams();
  const { data, loading, error, request} = useXMLHttpRequest();
  
  React.useEffect(function(){
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);
 
  if(error){
    return <Error error={error}/>
  };
  
  if(loading){
    return <Loading/>
  };

  if(data){
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} description="Home do site de Dogs, com o feed de fotos"/>
        <PhotoContent data={data} single={true}/>
      </section>
    );
  }else{
    return null;
  }
};

export default Photo;