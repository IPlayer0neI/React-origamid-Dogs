import React from "react";

function useXMLHttpRequest(){
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(function(url, options, call){ 
    setError(null);
    setLoading(true);
        
    const req = new XMLHttpRequest();
    req.open(options.method, url);
    options.headers && options.headers.forEach(function([header, value]){
      req.setRequestHeader(header, value);
    });
    req.onload = function(){
      try{
        if(req.status != 200){
          throw new Error(req.status);
        };
        setData(JSON.parse(req.response));
          call && call(req, JSON.parse(req.response));
        }catch(error){
          setData(null);
          setError("Error" + error.message);
        }finally{
            setLoading(false);
        };
      };
    req.send(options.body || null);
  }, []);

  return {
    data,
    loading,
    error,
    request
  };
};

export default useXMLHttpRequest;