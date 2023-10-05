import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

function FeedPhotos({user, page, setModalPhoto, setInfinite}){
  const {data, loading, error, request} = useXMLHttpRequest();

  React.useEffect(function(){
    function fetchPhotos(){
      const total = 3;
      const { url, options } = PHOTOS_GET({page: page, total: total, user: user});
      request(url ,options, function(req, res){
        if(req && req.status == 200 & res.length < total){
          setInfinite(false);
        };
      });
    };
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if(error){
    return <Error error={error}/>
  };

  if(loading){
    return <Loading/>
  };

  if(data){
    return (
      <ul className={"animeLeft " + styles.feed}>
        {
          data.map(function(photo){
            return (<FeedPhotosItem 
              key={photo.id} 
              photo={photo}
              setModalPhoto={setModalPhoto}
            />);
          })
        }
      </ul>
    );
  }else{
    return null;
  };
};

export default FeedPhotos;