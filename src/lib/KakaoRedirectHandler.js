import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useDispatch } from "react-redux";
import { login } from "../store/modules/user";
import { SERVER_IP } from "./ip";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = window.localStorage.getItem("url");
  const urlArr = url.split("/");
  console.log(urlArr);
  let targetUrl = "";

  for (let i = 3; i < urlArr.length; i++) {
    if (urlArr[i] === "") targetUrl += urlArr[i];
    else targetUrl += urlArr[i] + "/";
  }

  const pollId = targetUrl;

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get("code");
    const GRANT_TYPE = "authorization_code";
    const { REACT_APP_KAKAO_CLIENT_ID } = process.env;
    const KAKAO_REDIRECT_URI = `${SERVER_IP}:3000/oauth/callback/kakao`;

    async function loginFetch() {
      // 토큰 발행
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      if (tokenResponse.status !== 200) {
        alert("카카오 로그인 토큰 발행 실패");
        return navigate(`/${pollId}`);
      }

      const tokenData = await tokenResponse.json();

      // 토큰을 보내서 정보 받기
      const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (userResponese.status !== 200) {
        alert("카카오 유저 정보 받기 실패");
        return navigate(`/${pollId}`);
      }

      const userKakaoInfo = await userResponese.json();

      const userInfo = {
        kakaoId: userKakaoInfo.id,
        email: userKakaoInfo.kakao_account.email,
        nickname: userKakaoInfo.properties.nickname,
      };

      const loginResponse = await axios.post("/user/login", userInfo);

      if (loginResponse.status === 400) {
        alert("로그인 문제 발생");
        return navigate(`/${pollId}`);
      }

      const loginUser = {
        code: loginResponse.data,
      };

      if (loginResponse.status === 200) {
        alert("로그인 완료");
        dispatch(login(loginUser));
        return navigate(`/${pollId}`);
      }

      const registerResponse = await axios.post("/user/register", userInfo);

      if (registerResponse.status === 200) {
        alert("회원 가입 및 로그인 완료");

        const registeredUser = {
          code: registerResponse.data.code,
        };
        dispatch(login(registeredUser));

        return navigate(`/${pollId}`);
      }

      alert("로그인 실패");
      return navigate(`/${pollId}`);
    }

    try {
      loginFetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <></>;
};

export default KakaoRedirectHandler;
