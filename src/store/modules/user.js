const LOGIN = 'mbti/LOGIN';
const LOGOUT = 'mbti/LOGOUT';


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
  id: '',
  isLogin: false,
};

const localStorageLogin = JSON.parse(window.localStorage.getItem('login'));

if (localStorageLogin?.isLogin) {
  initState.id = localStorageLogin.id;
  initState.isLogin = localStorageLogin.isLogin;
}

// 리듀서
export default function user(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      const storageObj = {
        id: action.payload.id,
        isLogin: true,
        expire: Date.now + 24 * 60 * 60 * 1000,
      }
      const storageObjStr = JSON.stringify(storageObj);
      window.localStorage.setItem('login', storageObjStr);

      return {
        ...state,
        isLogin: true,
        id: action.payload.id,
      };
    case LOGOUT:
      window.localStorage.removeItem('login');
      alert("로그아웃 완료");

      return {
        ...state,
        isLogin: false,
        id: '',
      };
    default:
      return state;
  }
}
