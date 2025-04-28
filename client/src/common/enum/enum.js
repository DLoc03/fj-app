const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const USER_TYPE = {
  EMPLOYER: "employer",
  USER: "user",
};

const SESSION_DATA = {
  USERID: "UserID",
  ACCESSTOKEN: "AccessToken",
  EXPIRESAT: "ExpiresAt",
  NEW_ACCESSTOKEN: "NewAccessToken",
  APPLICANT: "Applicant",
};

const SOCKET_ENUM = {
  SEND_MESSAGE: "user-message",
  BOT_MESSAGE: "bot-message",
  CONNECT: "connection",
  CLOSE: "close",
  END: "--END--",
};

export { HTTP_METHOD, USER_TYPE, SESSION_DATA, SOCKET_ENUM };
