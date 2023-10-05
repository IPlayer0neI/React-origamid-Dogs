import React from "react";
import { useParams } from "react-router-dom";
import Head from "../Helper/Head";
import Feed from "../Feed/Feed";

function UserProfile(){
  const { user } = useParams();

  return (
    <section>
      <Head title={user} description="Home do site de Dogs, com o feed de fotos"/>
      <h1 className="title">{user}</h1>
      <Feed user={user}/>
    </section>
  );
};

export default UserProfile;