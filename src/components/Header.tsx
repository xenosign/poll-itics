import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/modules/user";
import { handleGoToMain } from "../lib/utils";
import { SERVER_IP } from "../lib/ip";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user);

  const KAKAO_CLIENT_ID: string = "2be90ab71a1f36d735f12cd91b53a982";
  const KAKAO_REDIRECT_URI: string = `${SERVER_IP}:3000/oauth/callback/kakao`;
  const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogout = () => {
    dispatch(logout());
    navigate(0);
  };

  const handleSaveUrl = () => {
    window.localStorage.setItem("url", window.location.href);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={handleGoToMain}>
        <h1>Poll-itics</h1>
      </div>
      <div className={styles.buttonBox}>
        <Link to="/register" className={styles.registerBox}>
          <span className="material-symbols-outlined">app_registration</span>
          <span className={styles.text}>등록</span>
        </Link>
        {userInfo.isLogin ? (
          <div onClick={handleLogout} className={styles.loginBox}>
            <img src="/kakao.png" alt="카카오" className={styles.kakao} />
            <span className={styles.log}>logout</span>
          </div>
        ) : (
          <Link
            onClick={handleSaveUrl}
            to={KAKAO_AUTH_URL}
            className={styles.loginBox}
          >
            <img src="/kakao.png" alt="카카오" className={styles.kakao} />
            <span className={styles.log}>login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
