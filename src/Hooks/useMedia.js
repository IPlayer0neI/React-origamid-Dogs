import React from "react";

function useMedia(media){
  const [match, setMatch] = React.useState(null);

  React.useEffect(function(){
    function changeMacth(){
      if(window.innerWidth < media){
        setMatch(true);
      }else{
        setMatch(false);
      };
    };
    changeMacth();
    window.addEventListener("resize", changeMacth);

    return function(){
       window.removeEventListener("resize", changeMacth);
    };
   }, [media]);

   return match;
};

export default useMedia;