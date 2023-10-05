import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropTypes from "prop-types";

function Feed({ user }){
  const [pages, setPages] = React.useState([1,2,3]);
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [infinite, setInfinite] = React.useState(true);
  
  React.useEffect(function(){
    let wait = false;

    if(infinite){
      function infiniteScroll(){
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        
        if(scroll > height * 0.75 && !wait){
          setPages(function(pages){
            return [...pages, pages.length + 1];
          });
  
          wait = true;
          setTimeout(function(){
            wait = false
          }, 500);
        };
      };

      window.addEventListener("whell", infiniteScroll);
      window.addEventListener("scroll", infiniteScroll);
      return function(){
        window.removeEventListener("whell", infiniteScroll);
        window.removeEventListener("scroll", infiniteScroll);
      };
    };
  }, [infinite]);

  return (
    <section>
       {modalPhoto && <FeedModal setModalPhoto={setModalPhoto} photo={modalPhoto}/>}
       {
         pages.map(function(page){
           return (
             <FeedPhotos 
               key={page} 
               user={user} 
               page={page} 
               setInfinite={setInfinite}
               setModalPhoto={setModalPhoto}
            />
           );
         })
       }
    </section>
  );
};

Feed.defaultProps = {
  user: 0
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ])
};

export default Feed;