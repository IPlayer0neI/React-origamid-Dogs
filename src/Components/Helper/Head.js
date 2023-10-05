import React from "react";

function Head(props){
    
  React.useEffect(function(){
    document.title = props.title + " | Dogs";
    document.querySelector("meta[name=description]")
    .setAttribute("content", props.description || "" );
  }, [props]);

  return null;
};

export default Head;