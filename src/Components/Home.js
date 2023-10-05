import React from "react";
import styles from "./Home.module.css";
import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

function Home(){
  return (
    <div className="container mainContainer">
        <Head title="fotos" description="Home do site de Dogs, com o feed de fotos"/>
        <Feed user={0}/>
    </div>
  );
};

export default Home;