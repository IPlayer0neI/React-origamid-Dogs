import React from "react";
import { STATS_GET } from "../../api";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import useXMLHttpRequest from "../../Hooks/useXMLHttpRequest";
import Error from "../Helper/Error";

const UserStatsGraphics = React.lazy(function(){
  return import("./UserStatsGraphics");
});

function UserStats(){
  const { data, loading, error, request } = useXMLHttpRequest();
  React.useEffect(function(){
    const token = window.localStorage.getItem("token")
    const { url, options } = STATS_GET(token);
    request(url, options);
  });

  if(loading){
    return <Loading/>
  };
  if(error){
    return <Error error={error}/>
  };
  if(data){
    return (
      <React.Suspense fallback={<div></div>}>
        <section className="container">
          <Head title="Estatísticas" description="Home do site de Dogs, com o feed de fotos"/>
          <UserStatsGraphics data={data}/>
        </section>
      </React.Suspense>
    );
  }else{
    return null;
  };
};

export default UserStats;