import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserStorage({children}){
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(function(){
    console.log("invalido")
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(null);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, []);


  function getUser(token){
    const { url, options } = USER_GET(token);
   
    const req = new XMLHttpRequest();
    req.open(options.method, url);
    req.setRequestHeader(options.headers[0][0], options.headers[0][1]);
    req.onload = function(){
      setData(JSON.parse(req.response));
      setLogin(true);
    };
    req.send();
  };

  React.useEffect(function(){
    function autoLogin(){
      const token = window.localStorage.getItem("token");

      if(token){
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);

          const req = new XMLHttpRequest();
          req.open(options.method, url);
          req.setRequestHeader(options.headers[0][0], options.headers[0][1]);
          req.onload = function(){
            try{
              if(req.status !== 200){
                throw new Error("Token invalido");
              };
              getUser(token);
            }catch(error){
              userLogout();
            }finally{
              setLoading(false);
            };
          };
          req.send();
      }else{
        setLogin(false);
      };
    };
    autoLogin() ;  
    }, [userLogout]);

  function userLogin(username, password){
    setError(null);
    setLoading(true);
    const { url, options } = TOKEN_POST({username, password});
    const req = new XMLHttpRequest();
    req.open(options.method, url);
    req.setRequestHeader(options.headers[0][0], options.headers[0][1]);
    req.onload = function(){
      try{
        if(req.status !== 200){
          throw new Error("Error " + req.statusText);
        };

        const json = JSON.parse(req.response);
        window.localStorage.setItem("token", json.token);
        getUser(json.token);
        navigate("/conta");
      }catch(error){
        console.log("error",error.message)
        setError(error.message);
        setLogin(false);
      }finally{
        setLoading(false);
      };
    };
    req.send(options.body);
  };

  return (
    <UserContext.Provider value={{userLogin,  data, error, loading, login, userLogout }}>
          {children}
    </UserContext.Provider>
  );
};

export { UserStorage , UserContext};
