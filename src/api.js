const API_URL = "https://dogsapi.origamid.dev/json";

function TOKEN_POST(body){
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
        method: "POST",
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify(body)
    }
  };
};

function USER_GET(token){
  return {
    url: API_URL + "/api/user",
    options: {
        method: "GET",
        headers: [
          ["Authorization", "Bearer " + token]
        ]
    }
  };
};

function TOKEN_VALIDATE_POST(token){
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
        method: "POST",
        headers: [
          ["Authorization", "Bearer " + token]
        ]
    }
  };
};

function USER_POST(body){
  return {
    url: API_URL + "/api/user",
    options: {
        method: "POST",
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify(body)
      }
  };
};

function PHOTO_POST(formData, token){
  return {
    url: API_URL + "/api/photo",
    options: {
      method: "POST",
      headers: [
        ["Authorization", "Bearer " + token]
      ],
      body: formData
    } 
  };
};


function PHOTOS_GET({page, total, user}){
  return {
    url: API_URL + "/api/photo/?_page=" + page + "&_total=" + total + "&_user=" + user,
    options: {
      method: "GET"
    } 
  };
};

function PHOTO_GET(id){
  return {
    url: API_URL + "/api/photo/" + id,
    options: {
      method: "GET"
    } 
  };
};

// function PHOTO_GET(id){
//   return {
//     url: API_URL + "/api/comment/" + id,
//     options: {
//       method: "GET",
//     },
//   };
// };

function COMMENT_POST(id, body, token){
  return {
    url: API_URL + "/api/comment/" + id,
    options: {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", "Bearer " + token]
      ],
      body: JSON.stringify(body)
    },
  };
};

function PHOTO_DELETE(id, token){
  return {
    url: API_URL + "/api/comment/" + id,
    options: {
      method: "DELETE",
      headers: [
        ["Authorization", "Bearer " + token]
      ],
    },
  };
};

function PASSWORD_LOST(body){
  return {
    url: API_URL + "/api/password/lost" ,
    options: {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify(body)
    },
  };
};

function PASSWORD_RESET(body){
  return {
    url: API_URL + "/api/password/reset" ,
    options: {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify(body)
    },
  };
};

function STATS_GET(token){
  return {
    url: API_URL + "/api/stats" ,
    options: {
      method: "GET",
      headers: [
        ["Authorization", "Bearer " + token]
      ]
    },
  };
};

export {
    API_URL,
    PHOTO_DELETE,
    STATS_GET,
    PASSWORD_RESET,
    PASSWORD_LOST,
    PHOTOS_GET,
    PHOTO_GET,
    COMMENT_POST,
    TOKEN_POST,
    USER_GET,
    TOKEN_VALIDATE_POST,
    PHOTO_POST,
    USER_POST
}