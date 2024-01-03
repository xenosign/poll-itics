import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Poll from "../components/Poll";
import styles from "./Landing.module.css";
import Loading from "../components/Loading";
import ServerError from "../components/ServerError";

export default function Landing() {
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

  if (err) return <ServerError />;

  return (
    <div className={styles.listBox}>
      <p className={styles.subject}>투표 목록</p>
      {list.length === 0 && <Loading />}
      {list?.map((poll: any) => {
        return <Poll key={poll.id} id={poll.id} subject={poll.subject} />;
      })}
    </div>
  );
}
