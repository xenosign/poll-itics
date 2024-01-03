const LOGIN = "mbti/LOGIN";
const LOGOUT = "mbti/LOGOUT";

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function logout(payload) {
  return {
    type: LOGOUT,
    payload,
  };
}

const initState = {
  code: "",
  isLogin: false,
};

const localStorageLogin = JSON.parse(window.localStorage.getItem("login"));

if (localStorageLogin?.isLogin) {
  initState.code = localStorageLogin.code;
  initState.isLogin = localStorageLogin.isLogin;
}

// 리듀서
export default function user(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      const storageObj = {
        code: action.payload.code,
        isLogin: true,
        expire: Date.now + 6 * 60 * 60 * 1000,
      };
      const storageObjStr = JSON.stringify(storageObj);
      window.localStorage.setItem("login", storageObjStr);

      return {
        ...state,
        isLogin: true,
        code: action.payload.code,
      };
    case LOGOUT:
      window.localStorage.removeItem("login");
      alert("로그아웃 완료");

      return {
        ...state,
        isLogin: false,
        code: "",
      };
    default:
      return state;
  }
}
