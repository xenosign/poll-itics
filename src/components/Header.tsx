import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/modules/user";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user);

  const KAKAO_CLIENT_ID: string = "2be90ab71a1f36d735f12cd91b53a982";
  const KAKAO_REDIRECT_URI: string =
    "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogout = () => {
    dispatch(logout());
    navigate(0);
  };

  return (
    <div className={styles.header}>
      <div>
        <h1>Poll-itics</h1>
      </div>
      <div>
        {userInfo.isLogin ? (
          <p onClick={handleLogout}>카카오 로그아웃</p>
        ) : (
          <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
