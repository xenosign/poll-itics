const { REACT_APP_DEV_MODE } = process.env

let SERVER_IP = "";

if (REACT_APP_DEV_MODE === 'server') {
  SERVER_IP = "http://54.180.105.73";
} else {
  SERVER_IP = "http://localhost";
}

export { SERVER_IP };
