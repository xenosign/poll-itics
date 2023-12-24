import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Poll from "../components/Poll";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
  const [list, setList] = useState<any>([]);

  const getPollsList = async () => {
    try {
      const res = await axios.get(`/`);
      if (res.status !== 200) return alert("데이터 통신 이상");

      const pollList = await res.data;
      setList(pollList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPollsList();
  }, []);

  if (list.length === 0)
    return (
      <>
        <h1>서버 접속 실패</h1>
        <br />
        <a href="/">
          <h2>다시 접속하기</h2>
        </a>
      </>
    );

  return (
    <div className={styles.listBox}>
      <h1 className={styles.subject}>투표 목록</h1>
      {list?.map((poll: any) => {
        return <Poll key={poll.id} id={poll.id} subject={poll.subject} />;
      })}
    </div>
  );
}
