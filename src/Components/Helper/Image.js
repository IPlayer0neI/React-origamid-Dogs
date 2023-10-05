import React from "react";
import styles from "./Image.module.css";

function Image({ src, alt}){
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }){
    target.style.opacity = 1;
  };

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}/>}
      <img 
        className={styles.img} 
        onLoad={handleLoad}
        alt={alt}
        src={src}
      />
    </div>
  )
};

export default Image;