import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "../store/modules/user";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get("code");
    const GRANT_TYPE = "authorization_code";
    // REST API 키를 입력 해야 합니다!
    const KAKAO_CLIENT_ID = "2be90ab71a1f36d735f12cd91b53a982";
    const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

    async function loginFetch() {
      // 토큰 발행
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      if (tokenResponse.status !== 200)
        return alert("카카오 로그인 토큰 발행 실패");

      const tokenData = await tokenResponse.json();

      // 토큰을 보내서 정보 받기
      const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (userResponese.status !== 200)
        return alert("카카오 유저 정보 받기 실패");

      const userKaKaoInfo = await userResponese.json();

      console.log("userKaKaoInfo", userKaKaoInfo);

      const userInfo = {
        kakaoId: userKaKaoInfo.id,
        email: userKaKaoInfo.kakao_account.email,
        nickname: userKaKaoInfo.properties.nickname,
      };

      console.log("###", userInfo);

      const registerResponse = await fetch(
        "http://localhost:3001/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      navigate("/");
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
