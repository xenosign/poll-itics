import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Poll from "../components/Poll";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
  const KAKAO_CLIENT_ID: string = "2be90ab71a1f36d735f12cd91b53a982";
  const KAKAO_REDIRECT_URI: string =
    "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const [list, setList] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);

  const getPollsList = async () => {
    try {
      const res = await axios.get(`/poll`);
      if (res.status !== 200) return alert("데이터 통신 이상");

      const pollList = await res.data;
      setList(pollList);
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  useEffect(() => {
    getPollsList();
  }, []);

  if (err)
    return (
      <>
        <h1>서버 통신 이상</h1>
        <br />
        <h2>
          <Link to="/">재접속 하기</Link>
        </h2>
      </>
    );

  return (
    <div className={styles.listBox}>
      <p className={styles.subject}>투표 목록</p>
      {list?.map((poll: any) => {
        return <Poll key={poll.id} id={poll.id} subject={poll.subject} />;
      })}
    </div>
  );
}
