const { REACT_APP_DEV_MODE } = process.env;

let SERVER_IP = "";

if (REACT_APP_DEV_MODE === "server") {
  SERVER_IP = process.env.REACT_APP_SERVER_IP;
} else {
  SERVER_IP = "http://localhost";
}

export { SERVER_IP };
